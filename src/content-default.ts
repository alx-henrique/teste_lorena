export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  feedback: string;
}

export interface WebsiteContent {
  whatsappPhone: string;
  whatsappText: string;
  fofocaEpisodeUrl: string;
  fofocaDescription: string;
  heroImageSrc: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  aboutMeRole: string;
  aboutMeBodyText1: string;
  aboutMeBodyText2: string;
  stat1Value: string;
  stat1Text: string;
  stat2Value: string;
  stat2Text: string;
  bastidorImage1: string;
  bastidorImage2: string;
  instagramUrl: string;
  testimonials: Testimonial[];
  learnMoreImageSrc?: string;
  learnMoreText?: string;
}

export const DEFAULT_CONTENT: WebsiteContent = {
  whatsappPhone: "5562999945420",
  whatsappText: "Oi! Vim pelo site e me interessei em saber mais sobre a consultoria financeira.",
  fofocaEpisodeUrl: "https://open.spotify.com/embed/episode/03jddbMaYVhjt8SrzbNlhS?utm_source=generator&si=be2b9301791741c8",
  fofocaDescription: "No episódio mais recente, conversamos sobre os desafios reais de quem decide mudar de rumo profissional de forma planejada. Dê o play para conferir!",
  heroImageSrc: "https://res.cloudinary.com/drrbezrpk/image/upload/v1783000000/Untitled-1_r6yx8s.png",
  heroSubtitle: "e que leve em consideração as suas particularidades é o caminho no qual eu aposto para uma vida financeira melhor, seja para a empresa, seja para todas as pessoas que estão por trás.",
  heroCtaText: "Quero agendar minha conversa",
  heroCtaLink: "https://api.whatsapp.com/send/?phone=5562999945420&text=Oi%21+Vim+pelo+site+e+me+interessei+em+saber+mais+sobre+a+consultoria+financeira.&type=phone_number&app_absent=0",
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
  learnMoreImageSrc: "https://res.cloudinary.com/drrbezrpk/image/upload/v1782950670/Captura_de_tela_2026-07-01_210511_klbdxp.png",
  learnMoreText: `Comecei minha carreira como planejadora financeira independente em 2018, época em que atendia exclusivamente pessoas físicas. Talvez por isso, ainda que hoje meu foco seja o atendimento de pequenos negócios, o **meu ponto de partida continua sendo as pessoas e as vidas envolvidas ali** e não apenas números, gráficos, indicators e processos. Vai muito além disso. E que bom que é assim!\n\nAlém das consultorias, também ofereço palestras, supervisão para colegas de profissão, workshops, rodas de conversa, sempre com o propósito de **trazer o assunto "grana" para a mesa de forma clara, realista e acessível**.\n\nPor entender o impacto do meu trabalho, sempre me preocupei em continuar estudando e me aperfeiçoando. Sou engenheira civil formada pela UFG, onde também fiz mestrado, e desde que migrei para o planejamento financeiro, me preocupo em seguir me desenvolvendo.\n\nAtualmente, sou **pós-graduanda em Gestão de Negócios na USP/Esalq**, aluna e supervisora da **Nossa – Escola para Planejadores Financeiros**, sou **consultora CVM certificada**, e possuo a **certificação CFP®**, a mais respeitada certificação internacional de planejamento financeiro.`,
  testimonials: [
    {
      id: "1",
      name: "Livia Leite",
      role: "Estúdio Maré",
      avatar: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132372/Livia_Leite_-_Est%C3%BAdio_Mar%C3%A9_az85yl.jpg",
      feedback: "A consultoria me ajudou muito a entender onde a minha empresa se encontra, definir onde queremos chegar e qual é o caminho para isso. \n\nA metodologia da Lorena me deu mais confiança para lidar com os processos dentro da empresa e também me ajudou a estruturar toda a parte financeira do meu negócio!"
    },
    {
      id: "2",
      name: "Adeyc Borges",
      role: "",
      avatar: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132420/Adeyc_Borges_nh25yy.jpg",
      feedback: "Existem pessoas que fazem muito mais do que prestar um serviço: elas caminham ao nosso lado nos momentos mais importantes. A Lorena foi exatamente essa pessoa para mim.\n\nEla chegou em um dos períodos mais desafiadores da minha trajetória profissional, quando eu estava recomeçando e precisava tomar decisões importantes para construir uma empresa sólida. Sempre fui apaixonado pelo que faço, mas administrar as finanças de um negócio era um grande desafio para mim.\n\nEm cada reunião, a Lorena me ajudava a enxergar o cenário com clareza. Juntos analisávamos cada passo, decidíamos o que fazia sentido naquele momento, o que precisava esperar e quais eram os caminhos mais seguros para o crescimento da minha marca. Esse suporte foi essencial para que eu tomasse decisões com mais confiança e responsabilidade.\n\nHoje posso dizer que grande parte da tranquilidade que tenho para gerir o meu negócio vem desse acompanhamento. Afinal, a saúde financeira é a base de qualquer empresa que deseja crescer de forma sustentável.\n\nSou muito grato à Lorena por todo o profissionalismo, dedicação e parceria. E mais do que uma consultora financeira, ela se tornou alguém em quem confio para me orientar nas decisões mais importantes da minha empresa. Recomendo o trabalho dela de olhos fechados."
    },
    {
      id: "3",
      name: "Claudia Kievel",
      role: "Jardim Secreto",
      avatar: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132418/Claudia_Kievel_-_Jardim_Secreto_reqxed.png",
      feedback: "Ter começado a consultoria financeira com a Lorena foi essencial para entender que precisava de uma organização e revisão mais aprofundada das questões administrativas, burocráticas e dos números do meu negócio. \n\nCom ela pude entender como ser a administradora que meu negócio precisava - e que eu nem achava que conseguiria ser - mesmo não sendo a minha área de atuação ou formação, mas por ser uma necessidade e responsabilidade dentro da empresa.\n\nMe sinto cada vez mais tranquila e consciente com o meu negócio. Tanto na visão do dia a dia, como numa visão mais macro. \n\nMe sinto no controle e claro, mais em paz!"
    },
    {
      id: "4",
      name: "Stephanie",
      role: "Ondas Buenas",
      avatar: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132419/Stephanie_-_Ondas_Buenas_hdaiol.png",
      feedback: "Adoro o tema, tento estudar sobre na medida do possível e pensava que poderia fazer tudo sozinha, com meus papéis e tabelinhas do excel. Que iludida! \n\nTer o conhecimento da Lorena fez eu entender que era uma necessidade da minha empresa essa atenção mais detalhada para o financeiro e tudo que atravessa esse campo. \n\nEla é uma profissional muito atenta e o que mais me encantou é que não toma uma decisão sem antes pensar junto, entender a realidade, que é particular de cada um.\n\nCom ela pude me sentir mais segura para seguir dirigindo meu negócio, assim como dando mais razão ao que acredito onde minha marca pode chegar. Hoje, posso afirmar que tenho além de contas, números organizados e calculados, tenho consciência do rumo que meu negócio está tomando e que consequências o movimento dele pode resultar. Obrigada, Lore!\n\nComo falamos na Argentina: \nvamos por más!"
    }
  ]
};
