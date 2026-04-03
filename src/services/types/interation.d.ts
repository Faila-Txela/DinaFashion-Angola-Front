export type StatusType = 'NOVO_LEAD' | 'VENDA_FEITA' | 'PERDIDO';

export type Interation = {
  id: string;
  cliente: { nome: string; email: string };
  produto: { name: string };
  dataInteration: string;
  status: StatusType;
  mensagemInicial?: string;
  linkWhatsApp?: string;
  respondeu?: boolean;
};
