export interface DatosConJwt
{
    jwt: string;
}

export interface Mensaje{
    id: number;
    asunto: string;
    cuerpo: string;
    fecha: Date;
}