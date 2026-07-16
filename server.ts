import express from "express";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const currentFilename = typeof __filename !== "undefined"
  ? __filename
  : fileURLToPath(import.meta.url);

const currentDirname = typeof __dirname !== "undefined"
  ? __dirname
  : path.dirname(currentFilename);

const SECRET_FILE_PATH = path.join(currentDirname, "src", "admin_secret.json");

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function getAdminPasswordHash(): Promise<string> {
  try {
    const data = await fs.readFile(SECRET_FILE_PATH, "utf-8");
    return JSON.parse(data).passwordHash;
  } catch (e) {
    return hashPassword(process.env.ADMIN_PASSWORD || "lore2026");
  }
}

async function setAdminPassword(newPassword: string): Promise<void> {
  const hash = hashPassword(newPassword);
  await fs.writeFile(SECRET_FILE_PATH, JSON.stringify({ passwordHash: hash }), "utf-8");
}

// Simple in-memory session store
const validSessions = new Set<string>();

const PENALTY_DURATIONS = [
  15 * 60 * 1000,           // 15 min
  60 * 60 * 1000,           // 60 min
  24 * 60 * 60 * 1000,      // 24 hours
  365 * 24 * 60 * 60 * 1000 // 1 year
];

interface AttemptInfo {
  count: number;
  lockedUntil: number;
  penaltyLevel: number;
}

// Simple in-memory rate limiter to prevent brute force attacks
const loginAttempts = new Map<string, AttemptInfo>();

function rateLimitMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  let attemptInfo = loginAttempts.get(ip);

  if (!attemptInfo) {
    attemptInfo = { count: 0, lockedUntil: 0, penaltyLevel: 0 };
    loginAttempts.set(ip, attemptInfo);
  }

  if (now < attemptInfo.lockedUntil) {
    const remainingMs = attemptInfo.lockedUntil - now;
    let message = "Muitas tentativas de login.";
    if (remainingMs > 300 * 24 * 60 * 60 * 1000) {
      message += " Tente novamente em 1 ano.";
    } else if (remainingMs > 20 * 60 * 60 * 1000) {
      message += " Tente novamente em 24 horas.";
    } else if (remainingMs > 20 * 60 * 1000) {
      message += " Tente novamente em 60 minutos.";
    } else {
      message += " Tente novamente em 15 minutos.";
    }
    res.status(429).json({ error: message });
    return;
  }

  next();
}

function recordFailedLogin(req: express.Request) {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  let attemptInfo = loginAttempts.get(ip);
  if (!attemptInfo) {
    attemptInfo = { count: 0, lockedUntil: 0, penaltyLevel: 0 };
  }

  attemptInfo.count += 1;

  if (attemptInfo.count >= 5) {
    const penaltyDuration = PENALTY_DURATIONS[Math.min(attemptInfo.penaltyLevel, PENALTY_DURATIONS.length - 1)];
    attemptInfo.lockedUntil = now + penaltyDuration;
    attemptInfo.count = 0;
    attemptInfo.penaltyLevel += 1;
  }

  loginAttempts.set(ip, attemptInfo);
}

function clearLoginAttempts(req: express.Request) {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  loginAttempts.delete(ip);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Headers Middleware
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

  // Body parser middleware
  app.use(express.json());

  const CONTENT_FILE_PATH = path.join(currentDirname, "src", "content.json");

  // Load default content fallback
  const getDefaultContent = async () => {
    try {
      const defaultModulePath = path.join(currentDirname, "src", "content-default.ts");
      // Since it's a TS file and we're in ESM at runtime, we can read the raw default JSON
      // or return a hardcoded JS object matching DEFAULT_CONTENT to prevent file-loading issues in builds.
      return {
        whatsappPhone: "5562999945420",
        whatsappText: "Oi! Vim pelo site e me interessei em saber mais sobre a consultoria financeira.",
        fofocaEpisodeUrl: "https://open.spotify.com/embed/episode/03jddbMaYVhjt8SrzbNlhS?utm_source=generator&si=be2b9301791741c8",
        fofocaDescription: "No episódio mais recente, conversamos sobre os desafios reais de quem decide mudar de rumo profissional de forma planejada. Dê o play para conferir!",
        heroImageSrc: "https://res.cloudinary.com/drrbezrpk/image/upload/v1783000000/Untitled-1_r6yx8s.png",
        heroSubtitle: "e que leve em consideração as suas particularidades é o caminho no qual eu aposto para uma vida financeira melhor, seja para a empresa, seja para todas as pessoas que estão por trás.",
        heroCtaText: "",
        heroCtaLink: "",
        aboutMeRole: "CFP® & Consultora CVM Certificada",
        aboutMeBodyText1: "Como consultora CVM certificada, no meu dia a dia ofereço consultoria financeira individual para autônomos e pequenos negócios que querem olhar com inteligência e estratégia para a forma como geram e cuidam do dinheiro.",
        aboutMeBodyText2: "Acredito que finanças não precisam ser um bicho de sete cabeças e nem uma planilha fria e sem vida. É possível gerir um negócio de forma sustentável, mantendo a leveza, a saúde mental e a essência do que você faz.",
        stat1Value: "+210",
        stat1Text: "Pessoas físicas e profissionais autônomos",
        stat2Value: "+170",
        stat2Text: "Pequenos negócios",
        bastidorImage1: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784133155/1_Encontro_2026_1_ijxdvi.jpg",
        bastidorImage2: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784133155/1_Encontro_2026_brggw2.jpg",
        instagramUrl: "https://www.instagram.com/lorenapires.cfp/",
        testimonials: [
          {
            id: "1",
            name: "Livia Leite",
            role: "Estúdio Maré",
            avatar: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132372/Livia_Leite_-_Est%C3%BAdio_Mar%C3%A9_az85yl.jpg",
            feedback: `A consultoria me ajudou muito a entender onde a minha empresa se encontra, definir onde queremos chegar e qual é o caminho para isso. 

A metodologia da Lorena me deu mais confiança para lidar com os processos dentro da empresa e também me ajudou a estruturar toda a parte financeira do meu negócio!`
          },
          {
            id: "2",
            name: "Adeyc Borges",
            role: "",
            avatar: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132420/Adeyc_Borges_nh25yy.jpg",
            feedback: `Existem pessoas que fazem muito mais do que prestar um serviço: elas caminham ao nosso lado nos momentos mais importantes. A Lorena foi exatamente essa pessoa para mim.

Ela chegou em um dos períodos mais desafiadores da minha trajetória profissional, quando eu estava recomeçando e precisava tomar decisões importantes para construir uma empresa sólida. Sempre fui apaixonado pelo que faço, mas administrar as finanças de um negócio era um grande desafio para mim.

Em cada reunião, a Lorena me ajudava a enxergar o cenário com clareza. Juntos analisávamos cada passo, decidíamos o que fazia sentido naquele momento, o que precisava esperar e quais eram os caminhos mais seguros para o crescimento da minha marca. Esse suporte foi essencial para que eu tomasse decisões com mais confiança e responsabilidade.

Hoje posso dizer que grande parte da tranquilidade que tenho para gerir o meu negócio vem desse acompanhamento. Afinal, a saúde financeira é a base de qualquer empresa que deseja crescer de forma sustentável.

Sou muito grato à Lorena por todo o profissionalismo, dedicação e parceria. E mais do que uma consultora financeira, ela se tornou alguém em quem confio para me orientar nas decisões mais importantes da minha empresa. Recomendo o trabalho dela de olhos fechados.`
          },
          {
            id: "3",
            name: "Claudia Kievel",
            role: "Jardim Secreto",
            avatar: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132418/Claudia_Kievel_-_Jardim_Secreto_reqxed.png",
            feedback: `Ter começado a consultoria financeira com a Lorena foi essencial para entender que precisava de uma organização e revisão mais aprofundada das questões administrativas, burocráticas e dos números do meu negócio. 

Com ela pude entender como ser a administradora que meu negócio precisava - e que eu nem achava que conseguiria ser - mesmo não sendo a minha área de atuação ou formação, mas por ser uma necessidade e responsabilidade dentro da empresa.

Me sinto cada vez mais tranquila e consciente com o meu negócio. Tanto na visão do dia a dia, como numa visão mais macro. 

Me sinto no controle e claro, mais em paz!`
          },
          {
            id: "4",
            name: "Stephanie",
            role: "Ondas Buenas",
            avatar: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132419/Stephanie_-_Ondas_Buenas_hdaiol.png",
            feedback: `Adoro o tema, tento estudar sobre na medida do possível e pensava que poderia fazer tudo sozinha, com meus papéis e tabelinhas do excel. Que iludida! 

Ter o conhecimento da Lorena fez eu entender que era uma necessidade da minha empresa essa atenção mais detalhada para o financeiro e tudo que atravessa esse campo. 

Ela é uma profissional muito atenta e o que mais me encantou é que não toma uma decisão sem antes pensar junto, entender a realidade, que é particular de cada um.

Com ela pude me sentir mais segura para seguir dirigindo meu negócio, assim como dando mais razão ao que acredito onde minha marca pode chegar. Hoje, posso afirmar que tenho além de contas, números organizados e calculados, tenho consciência do rumo que meu negócio está tomando e que consequências o movimento dele pode resultar. Obrigada, Lore!

Como falamos na Argentina: 
vamos por más!`
          }
        ]
      };
    } catch (e) {
      return {};
    }
  };

  // API: Get current content
  app.get("/api/content", async (req, res) => {
    try {
      await fs.access(CONTENT_FILE_PATH);
      const data = await fs.readFile(CONTENT_FILE_PATH, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      // Return defaults if file doesn't exist
      const defaults = await getDefaultContent();
      res.json(defaults);
    }
  });

  // API: Save updated content
  app.post("/api/content", rateLimitMiddleware, async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authHeader.split(" ")[1];
      if (!validSessions.has(token)) {
        return res.status(403).json({ error: "Invalid or expired session" });
      }

      const updatedContent = req.body;
      
      // Ensure the directory exists
      await fs.mkdir(path.dirname(CONTENT_FILE_PATH), { recursive: true });
      await fs.writeFile(CONTENT_FILE_PATH, JSON.stringify(updatedContent, null, 2), "utf-8");

      res.json({ success: true, message: "Content saved successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // API: Admin Authentication Login Check
  app.post("/api/login", rateLimitMiddleware, async (req, res) => {
    const { password } = req.body;
    const providedHash = hashPassword(password);
    const validHash = await getAdminPasswordHash();

    if (providedHash === validHash) {
      clearLoginAttempts(req);
      const token = crypto.randomBytes(32).toString("hex");
      validSessions.add(token);
      res.json({ success: true, token });
    } else {
      recordFailedLogin(req);
      res.status(401).json({ success: false, error: "Senha incorreta" });
    }
  });

  // API: Change Password
  app.post("/api/change-password", rateLimitMiddleware, async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      
      if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ error: "A nova senha deve ter pelo menos 8 caracteres." });
      }

      const providedOldHash = hashPassword(oldPassword);
      const validHash = await getAdminPasswordHash();

      if (providedOldHash !== validHash) {
        recordFailedLogin(req);
        return res.status(401).json({ error: "Senha antiga incorreta." });
      }

      clearLoginAttempts(req);
      await setAdminPassword(newPassword);
      
      // Clear old sessions so old tokens are invalid
      validSessions.clear();
      
      const token = crypto.randomBytes(32).toString("hex");
      validSessions.add(token);
      
      res.json({ success: true, message: "Senha alterada com sucesso.", token });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite development middleware vs production static files handler
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(currentDirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
