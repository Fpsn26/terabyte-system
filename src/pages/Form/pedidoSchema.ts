import z from "zod";

export const pedidoSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(80, 'Nome muito longo')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  contato: z
    .string()
    .min(8, 'Número inválido')
    .max(20, 'Número inválido')
    .regex(/^[\d\s()\-+]+$/, 'Informe apenas números e símbolos de telefone'),
})