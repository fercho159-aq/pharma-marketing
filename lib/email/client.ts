import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM = "administracion@grupoohm.com";
export const ADMIN_EMAIL = "administracion@grupoohm.com";
