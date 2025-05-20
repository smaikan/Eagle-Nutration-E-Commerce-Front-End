import { Aksesuaritem } from "./aksesuaritem";
import { bestsellerItem } from "./bestselleritem";
import { giyimitem } from "./giyimitem";
import { Hacimitem } from "./hacimitem";
import { performance } from "./performanceitem";
import { Proteinitem } from "./proteinitem";
import { Zayiflamaitem } from "./zayiflamaitem";

export const Allitem=[
    ...bestsellerItem,
    ...giyimitem,
    ...performance,
    ...Proteinitem,
    ...Hacimitem,
    ...Zayiflamaitem,
    ...Aksesuaritem
]