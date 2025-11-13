import { Category, Frequency } from './types';
import { HeartIcon, BrainIcon, BriefcaseIcon, SparklesIcon, DollarSignIcon, UsersIcon, GlobeIcon, SmileIcon } from './components/Icons';

export const POST_IT_COLORS = [
  '#FFFFFF', // White
  '#E2E8F0', // Slate-200
  '#FEF08A', // Yellow-200
  '#FECDD3', // Rose-200
  '#BAE6FD', // Sky-200
  '#BBF7D0', // Green-200
  '#E9D5FF', // Purple-200
  '#FED7AA', // Orange-200
  '#A7F3D0', // Emerald-200
  '#C7D2FE', // Indigo-200
];

export const POST_IT_TEXT_COLORS: { [key: string]: string } = {
  '#FFFFFF': 'text-slate-800',
  '#E2E8F0': 'text-slate-800',
  '#FEF08A': 'text-slate-800',
  '#FECDD3': 'text-slate-800',
  '#BAE6FD': 'text-slate-800',
  '#BBF7D0': 'text-slate-800',
  '#E9D5FF': 'text-slate-800',
  '#FED7AA': 'text-slate-800',
  '#A7F3D0': 'text-slate-800',
  '#C7D2FE': 'text-slate-800',
};


export const ALL_POSSIBLE_CATEGORIES: Category[] = [
  {
    id: 'saude',
    name: 'Saúde e Bem-estar',
    icon: HeartIcon,
    color: '#D1FEB8',
    description: 'Corpo e mente em sintonia. Ex: Meditação, hidratação, exercícios, alimentação consciente.',
    examples: [
        'Planeje refeições nutritivas para a semana.',
        'Experimente uma nova atividade física (ioga, dança, corrida).',
        'Reserve 15 min antes de dormir para relaxar sem telas.',
    ],
    activities: [],
  },
  {
    id: 'carreira',
    name: 'Carreira e Negócios',
    icon: BriefcaseIcon,
    color: '#E9C9AA',
    description: 'Evolução profissional contínua. Ex: Estudar, networking, focar em prioridades.',
     examples: [
        'Organize a agenda da semana com blocos de foco total.',
        'Peça feedback a um colega ou gestor sobre um projeto.',
        'Dedique uma hora para aprender uma nova habilidade para sua área.',
    ],
    activities: [],
  },
  {
    id: 'dinheiro',
    name: 'Dinheiro',
    icon: DollarSignIcon,
    color: '#A8D5BA',
    description: 'Sua relação com a prosperidade. Ex: Controlar gastos, planejar orçamento, investir.',
    examples: [
        'Crie uma meta de economia (viagem, curso) e contribua semanalmente.',
        'Revise suas assinaturas e cancele as que não usa mais.',
        'Estude por 30 minutos sobre um tipo de investimento.',
    ],
    activities: [],
  },
  {
    id: 'conhecimento',
    name: 'Conhecimento e Aprendizado',
    icon: BrainIcon,
    color: '#E7D27C',
    description: 'Expandindo a mente e habilidades. Ex: Ler diariamente, fazer cursos, aprender idiomas.',
    examples: [
        'Ouça um podcast educativo no seu trajeto.',
        'Escreva um resumo sobre o último livro que leu.',
        'Ensine algo que você aprendeu para um amigo.',
    ],
    activities: [],
  },
  {
    id: 'relacionamento',
    name: 'Relacionamento Conjugal',
    icon: UsersIcon,
    color: '#F4B8B8',
    description: 'Cultivando o amor e a parceria. Ex: Noite do casal, diálogos, expressar gratidão.',
    examples: [
        'Crie uma "caixa de memórias" com fotos e bilhetes.',
        'Planejem juntos uma meta para o próximo mês.',
        'Faça uma pergunta profunda para gerar uma conversa significativa.',
    ],
    activities: [],
  },
  {
    id: 'social',
    name: 'Vida Social e Familiar',
    icon: UsersIcon,
    color: '#F4B8B8',
    description: 'Nutrindo suas conexões mais importantes. Ex: Ligar para um amigo, visitar a família.',
    examples: [
        'Envie uma mensagem de carinho inesperada para um amigo.',
        'Marque um café presencial com alguém que não vê há tempos.',
        'Crie um grupo de fotos compartilhadas com sua família.',
    ],
    activities: [],
  },
  {
    id: 'espiritualidade',
    name: 'Espiritualidade',
    icon: SparklesIcon,
    color: '#EFDFD8',
    description: 'Conexão com seu eu interior e o universo. Ex: Gratidão, silêncio, contato com a natureza.',
    examples: [
        'Escreva em um diário 3 coisas pelas quais você é grato(a).',
        'Passe 10 minutos em silêncio observando a natureza.',
        'Leia um trecho de um livro inspirador que nutra sua alma.',
    ],
    activities: [],
  },
  {
    id: 'contribuicao',
    name: 'Contribuição e Propósito Social',
    icon: GlobeIcon,
    color: '#B2E2F2',
    description: 'Deixando um impacto positivo no mundo. Ex: Voluntariado, atos de gentileza, doações.',
    examples: [
        'Separe roupas ou objetos em bom estado para doação.',
        'Compartilhe uma publicação sobre uma causa social que apoia.',
        'Ofereça ajuda a um vizinho com uma tarefa simples.',
    ],
    activities: [],
  },
  {
    id: 'hobbies',
    name: 'Hobbies',
    icon: SmileIcon,
    color: '#FDDBA2',
    description: 'Momentos de pura alegria e criatividade. Ex: Praticar um instrumento, pintar, jardinagem.',
    examples: [
        'Crie uma playlist com músicas que te inspiram.',
        'Assista a um tutorial ou aula online sobre seu hobby.',
        'Reserve um "encontro" na agenda dedicado ao seu hobby.',
    ],
    activities: [],
  },
];


// Default categories for a new user
export const INITIAL_CATEGORIES: Category[] = ALL_POSSIBLE_CATEGORIES.filter(c => 
    ['saude', 'carreira', 'conhecimento', 'espiritualidade'].includes(c.id)
);