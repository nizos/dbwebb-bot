import { Command } from "../interfaces/command";
import { inject, injectable } from "inversify";
import { Admin } from "./public/admin";
import { Akr } from "./public/akr";
import { Env } from "./public/env";
import { Guide } from "./public/guide";
import { Kmom } from "./public/kmom";
import { Kunskap } from "./public/kunskap";
import { Kurs } from "./public/kurs";
import { Labb } from "./public/labb";
import { Me } from "./public/me";
import { Uppgift } from "./public/uppgift";

@injectable()
export class Commands {
    public admin: Command = Admin;
    public akr: Command = Akr;
    public env: Command = Env;
    public guide: Command = Guide;
    public kmom: Command = Kmom;
    public kunskap: Command = Kunskap;
    public kurs: Command = Kurs;
    public labb: Command = Labb;
    public me: Command = Me;
    public uppgift: Command = Uppgift;
}
