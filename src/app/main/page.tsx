"use client"

import styles from "@/app/main/Main.module.scss";
import {Zain} from '@next/font/google';
import React, {useEffect, useState} from "react";
import {QuoteInterface} from "@/shared/types/quote.interface";
import {quoteService} from "@/services/quote.service";
import {API_URL} from "@/api/api.config";
import {Check, ChevronsUpDown} from "lucide-react"

import {cn} from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"


const zain = Zain({
    subsets: ['latin'], // Добавьте 'cyrillic', чтобы поддерживать русский текст
    weight: ['800'], // Укажите нужные веса шрифта
});
// const categories = [
//     {
//         value: "TypeScript",
//         label: "TypeScript",
//     },
//     {
//         value: "MATH",
//         label: "Математика",
//     },
//     {
//         value: "PHYSICS",
//         label: "Физика",
//     },
//
// ]
// const difficulty = [
//     {
//         value: "JUNIOR",
//         label: "JUNIOR",
//     },
//     {
//         value: "MIDDLE",
//         label: "MIDDLE",
//     },
//     {
//         value: "SENIOR",
//         label: "SENIOR",
//     },
//
// ]
// const title = [
//     {
//         value: "cicles",
//         label: "Циклы",
//     },
//     {
//         value: "Operators",
//         label: "Операторы",
//     },
//     {
//         value: "Async",
//         label: "Ассинхронность",
//     },
//
// ]


export default function Main() {

    // Константы для использования сложной формы всплывающего меню
    // const [open, setOpen] = React.useState(false)
    // const [open2, setOpen2] = React.useState(false)
    // const [open3, setOpen3] = React.useState(false)
    // const [value, setValue] = React.useState("")
    // const [value2, setValue2] = React.useState("")
    // const [value3, setValue3] = React.useState("")

    // Получаем цитаты так, ибо в сервисе ассинхронная функция - её значение нужно доставать так
    const [quote, setQuote] = useState<QuoteInterface>();
    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const fetchedQuote = await quoteService.findRandom();
                if (Array.isArray(fetchedQuote)) {
                    setQuote(fetchedQuote[0]); // Берём первый элемент массива
                } else {
                    setQuote(fetchedQuote); // Если вдруг вернулся объект
                }
            } catch (error) {
                console.error("Ошибка при загрузке цитаты:", error);
            }
        };
        fetchQuote();
    }, []);

    const [category, setCategory] = useState(""); // Категория
    const [difficulty, setDifficulty] = useState(""); // Сложность
    const [title, setTitle] = useState(""); // Тема
    const [userName, setUserName] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        // Собираем данные из состояния
        const requestBody = {
            userDto: { userName },
            findTaskDto: { difficulty, category, title },
        };

        try {
            // Отправляем данные на сервер
            const response = await fetch(API_URL.collab('/join'), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json(); // Получаем JSON-ответ от сервера
                console.log(data)
                const collabID = data.id; // Предположим, что сервер возвращает { id: "some-id" }
                window.location.href = `/collab/${collabID}`; // Редирект
            } else {
                console.error("Ошибка отправки формы");
            }
        } catch (error) {
            console.error("Произошла ошибка:", error);
        }
    };

    return (
        <main className={styles.wrapper}>

            <div className={styles.container}>

                {/*Цитата*/}
                {quote ? (
                    <p className="mt-16 text-sm">{quote.quote}</p>
                ) : (
                    <p className="mt-16 text-sm">Loading...</p>
                )}

                {/*Лого и слоган*/}
                <div className={styles.header}>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                         width="331.000000pt" height="81.000000pt" viewBox="0 0 1274.000000 211.000000"
                         preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,211.000000) scale(0.100000,-0.100000)"
                           fill="#7552E9" stroke="none">
                            <path d="M847 2000 c-125 -21 -283 -86 -377 -155 -57 -42 -146 -135 -189 -198
-51 -75 -109 -206 -133 -303 -31 -122 -33 -445 -4 -569 81 -350 298 -576 624
-652 111 -25 328 -23 436 6 215 57 378 215 431 417 42 163 -4 244 -96 170
-141 -113 -246 -169 -349 -185 -231 -37 -424 30 -531 185 -67 98 -98 264 -80
430 19 176 69 280 174 359 83 63 160 85 301 85 131 0 225 -20 347 -75 44 -20
95 -39 113 -42 42 -7 45 -1 76 125 41 170 19 257 -83 316 -64 38 -182 73 -282
85 -102 12 -306 13 -378 1z"/>
                            <path d="M3331 1961 c-17 -31 -10 -1508 7 -1569 34 -120 93 -197 189 -244 58
-28 78 -33 164 -36 139 -6 195 13 275 92 68 68 100 137 111 235 6 65 -7 101
-37 101 -10 0 -42 -15 -71 -32 -67 -42 -145 -46 -181 -10 l-23 23 -6 617 c-4
461 -8 627 -18 656 -24 73 -59 114 -127 147 -54 27 -77 32 -167 36 -100 6
-105 5 -116 -16z"/>
                            <path d="M4191 1961 c-17 -31 -10 -1508 7 -1569 34 -120 93 -197 189 -244 58
-28 78 -33 164 -36 139 -6 195 13 275 92 68 68 100 137 111 235 6 65 -7 101
-37 101 -10 0 -42 -15 -71 -32 -67 -42 -145 -46 -181 -10 l-23 23 -6 617 c-4
461 -8 627 -18 656 -24 73 -59 114 -127 147 -54 27 -77 32 -167 36 -100 6
-105 5 -116 -16z"/>
                            <path d="M6591 1962 c-8 -15 -11 -278 -11 -911 0 -795 2 -891 16 -905 13 -13
46 -16 204 -16 214 0 220 2 220 73 l0 41 33 -30 c76 -72 168 -104 298 -104 49
0 112 5 141 11 274 58 454 352 435 709 -21 395 -252 633 -597 618 -111 -6
-180 -29 -256 -87 l-52 -39 -5 216 c-3 128 -10 233 -17 256 -22 72 -58 114
-126 147 -54 27 -77 32 -167 36 -99 5 -105 5 -116 -15z m740 -937 c96 -34 141
-111 141 -239 1 -106 -17 -161 -67 -211 -88 -88 -237 -88 -321 0 -48 50 -64
101 -64 207 0 97 14 143 58 190 61 64 161 85 253 53z"/>
                            <path d="M9427 1843 c-4 -3 -7 -102 -7 -219 l0 -213 -122 -3 -123 -3 0 -185 0
-185 123 -3 122 -3 0 -437 c0 -327 3 -441 12 -450 17 -17 389 -17 406 0 9 9
12 123 12 450 l0 437 148 3 147 3 0 185 0 185 -145 5 -145 5 -6 125 c-4 106
-9 133 -30 175 -30 60 -96 108 -169 124 -56 12 -213 15 -223 4z"/>
                            <path d="M2285 1436 c-204 -40 -355 -150 -439 -320 -52 -104 -69 -189 -69
-336 0 -220 51 -359 183 -490 132 -133 263 -183 485 -183 257 0 426 80 549
260 153 224 153 592 0 816 -83 120 -203 204 -349 242 -84 22 -273 28 -360 11z
m271 -411 c76 -45 106 -113 106 -246 1 -115 -17 -174 -66 -223 -104 -105 -280
-81 -349 47 -19 37 -22 57 -22 167 0 111 3 130 23 172 55 111 196 149 308 83z"/>
                            <path d="M5461 1435 c-110 -24 -185 -67 -270 -153 -132 -134 -184 -275 -184
-502 1 -229 58 -387 187 -516 118 -118 228 -159 416 -152 97 3 110 6 180 40
41 21 85 45 98 54 22 16 22 16 22 -19 0 -26 6 -39 19 -47 26 -13 376 -13 402
0 18 10 19 28 19 628 0 339 -4 623 -9 631 -7 11 -31 13 -112 9 -115 -5 -180
-27 -224 -74 l-25 -27 -40 32 c-119 95 -307 133 -479 96z m337 -424 c84 -43
118 -124 110 -264 -9 -156 -84 -237 -222 -237 -92 0 -168 47 -207 127 -18 38
-23 64 -23 137 0 142 40 210 146 248 65 23 138 19 196 -11z"/>
                            <path d="M8445 1433 c-140 -29 -264 -113 -313 -209 -49 -98 -55 -253 -12 -352
45 -103 163 -185 363 -252 101 -33 157 -69 157 -100 0 -10 -14 -30 -32 -45
-32 -27 -35 -27 -138 -23 -119 5 -179 25 -299 98 -58 35 -73 40 -90 30 -26
-14 -35 -49 -27 -107 28 -207 265 -373 531 -373 149 0 268 44 363 134 93 87
141 219 129 349 -15 164 -114 256 -369 345 -48 17 -105 40 -127 51 -63 33 -67
88 -9 112 44 18 179 0 300 -42 53 -17 102 -29 110 -26 24 9 61 151 56 215 -4
50 -9 59 -49 97 -99 93 -352 139 -544 98z"/>
                            <path d="M10782 1440 c-286 -52 -477 -266 -513 -577 -28 -237 42 -457 189
-594 114 -107 242 -156 432 -166 204 -10 357 35 465 138 75 71 118 158 119
242 1 58 -1 62 -23 65 -13 2 -70 -15 -128 -38 -57 -23 -136 -48 -176 -57 -87
-18 -234 -13 -290 11 -70 30 -147 117 -147 166 0 7 127 10 384 10 310 0 386 3
395 14 20 24 25 241 8 334 -42 219 -187 382 -388 438 -67 18 -256 26 -327 14z
m231 -365 c34 -22 67 -83 67 -125 l0 -30 -190 0 c-104 0 -190 2 -190 4 0 2 7
23 15 47 18 50 57 95 100 115 42 20 162 13 198 -11z"/>
                            <path d="M11713 1399 c-10 -10 -13 -149 -13 -625 0 -544 2 -614 16 -628 23
-24 385 -24 408 0 14 13 16 58 16 339 0 376 5 413 60 466 47 45 100 59 219 59
79 0 92 2 101 19 12 24 13 350 1 370 -7 11 -36 13 -137 9 -149 -5 -199 -21
-260 -85 l-37 -39 -34 37 c-55 61 -110 82 -227 87 -74 3 -104 0 -113 -9z"/>
                        </g>
                    </svg>
                    <p className={"text-xs text-black"}>Выбери направление и свой уровень подготовки и начни
                        заниматься с новыми друзьями! </p>
                </div>

                {/*Там мудрённый вариант всплывающих списков                /!*<div className={"flex flex-row mt-4"}>*!/*/}
                {/*/!*    <Popover open={open} onOpenChange={setOpen}>*!/*/}
                {/*/!*        <PopoverTrigger asChild>*!/*/}
                {/*/!*            <Button*!/*/}
                {/*/!*                variant="outline"*!/*/}
                {/*/!*                role="combobox"*!/*/}
                {/*/!*                aria-expanded={open}*!/*/}
                {/*/!*                className="w-[200px] justify-between text-black"*!/*/}
                {/*/!*            >*!/*/}
                {/*/!*                {value*!/*/}
                {/*/!*                    ? categories.find((framework) => framework.value === value)?.label*!/*/}
                {/*/!*                    : "Категория.."}*!/*/}
                {/*/!*                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>*!/*/}
                {/*/!*            </Button>*!/*/}
                {/*/!*        </PopoverTrigger>*!/*/}
                {/*/!*        <PopoverContent className="w-[200px] p-0">*!/*/}
                {/*/!*            <Command>*!/*/}
                {/*/!*                <CommandInput placeholder="Выберите категорию..."/>*!/*/}
                {/*/!*                <CommandList>*!/*/}
                {/*/!*                    <CommandEmpty>No framework found.</CommandEmpty>*!/*/}
                {/*/!*                    <CommandGroup>*!/*/}
                {/*/!*                        {categories.map((categories) => (*!/*/}
                {/*/!*                            <CommandItem*!/*/}
                {/*/!*                                key={categories.value}*!/*/}
                {/*/!*                                value={categories.value}*!/*/}
                {/*/!*                                onSelect={(currentValue) => {*!/*/}
                {/*/!*                                    setValue(currentValue === value ? "" : currentValue)*!/*/}
                {/*/!*                                    setOpen(false)*!/*/}
                {/*/!*                                }}*!/*/}
                {/*/!*                            >*!/*/}
                {/*/!*                                <Check*!/*/}
                {/*/!*                                    className={cn(*!/*/}
                {/*/!*                                        "mr-2 h-4 w-4",*!/*/}
                {/*/!*                                        value === categories.value ? "opacity-100" : "opacity-0"*!/*/}
                {/*/!*                                    )}*!/*/}
                {/*/!*                                />*!/*/}
                {/*/!*                                {categories.label}*!/*/}
                {/*/!*                            </CommandItem>*!/*/}
                {/*/!*                        ))}*!/*/}
                {/*/!*                    </CommandGroup>*!/*/}
                {/*/!*                </CommandList>*!/*/}
                {/*/!*            </Command>*!/*/}
                {/*/!*        </PopoverContent>*!/*/}
                {/*/!*    </Popover>*!/*/}
                {/*/!*    <Popover open={open2} onOpenChange={setOpen2}>*!/*/}
                {/*/!*        <PopoverTrigger asChild>*!/*/}
                {/*/!*            <Button*!/*/}
                {/*/!*                variant="outline"*!/*/}
                {/*/!*                role="combobox"*!/*/}
                {/*/!*                aria-expanded={open2}*!/*/}
                {/*/!*                className="w-[200px] justify-between text-black"*!/*/}
                {/*/!*            >*!/*/}
                {/*/!*                {value2*!/*/}
                {/*/!*                    ? difficulty.find((framework) => framework.value === value2)?.label*!/*/}
                {/*/!*                    : "Уровень.."}*!/*/}
                {/*/!*                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>*!/*/}
                {/*/!*            </Button>*!/*/}
                {/*/!*        </PopoverTrigger>*!/*/}
                {/*/!*        <PopoverContent className="w-[200px] p-0">*!/*/}
                {/*/!*            <Command>*!/*/}
                {/*/!*                <CommandInput placeholder="Выберите Ваш уровень..."/>*!/*/}
                {/*/!*                <CommandList>*!/*/}
                {/*/!*                    <CommandEmpty>No framework found.</CommandEmpty>*!/*/}
                {/*/!*                    <CommandGroup>*!/*/}
                {/*/!*                        {difficulty.map((difficulty) => (*!/*/}
                {/*/!*                            <CommandItem*!/*/}
                {/*/!*                                key={difficulty.value}*!/*/}
                {/*/!*                                value={difficulty.value}*!/*/}
                {/*/!*                                onSelect={(currentValue) => {*!/*/}
                {/*/!*                                    setValue2(currentValue === value2 ? "" : currentValue)*!/*/}
                {/*/!*                                    setOpen2(false)*!/*/}
                {/*/!*                                }}*!/*/}
                {/*/!*                            >*!/*/}
                {/*/!*                                <Check*!/*/}
                {/*/!*                                    className={cn(*!/*/}
                {/*/!*                                        "mr-2 h-4 w-4",*!/*/}
                {/*/!*                                        value2 === difficulty.value ? "opacity-100" : "opacity-0"*!/*/}
                {/*/!*                                    )}*!/*/}
                {/*/!*                                />*!/*/}
                {/*/!*                                {difficulty.label}*!/*/}
                {/*/!*                            </CommandItem>*!/*/}
                {/*/!*                        ))}*!/*/}
                {/*/!*                    </CommandGroup>*!/*/}
                {/*/!*                </CommandList>*!/*/}
                {/*/!*            </Command>*!/*/}
                {/*/!*        </PopoverContent>*!/*/}
                {/*/!*    </Popover>*!/*/}
                {/*/!*    <Popover open={open3} onOpenChange={setOpen3}>*!/*/}
                {/*/!*        <PopoverTrigger asChild>*!/*/}
                {/*/!*            <Button*!/*/}
                {/*/!*                variant="outline"*!/*/}
                {/*/!*                role="combobox"*!/*/}
                {/*/!*                aria-expanded={open}*!/*/}
                {/*/!*                className="w-[200px] justify-between text-black"*!/*/}
                {/*/!*            >*!/*/}
                {/*/!*                {value3*!/*/}
                {/*/!*                    ? title.find((framework) => framework.value === value3)?.label*!/*/}
                {/*/!*                    : "Тема.."}*!/*/}
                {/*/!*                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>*!/*/}
                {/*/!*            </Button>*!/*/}
                {/*/!*        </PopoverTrigger>*!/*/}
                {/*/!*        <PopoverContent className="w-[200px] p-0">*!/*/}
                {/*/!*            <Command>*!/*/}
                {/*/!*                <CommandInput placeholder="Выберите тему..."/>*!/*/}
                {/*/!*                <CommandList>*!/*/}
                {/*/!*                    <CommandEmpty>No framework found.</CommandEmpty>*!/*/}
                {/*/!*                    <CommandGroup>*!/*/}
                {/*/!*                        {title.map((title) => (*!/*/}
                {/*/!*                            <CommandItem*!/*/}
                {/*/!*                                key={title.value}*!/*/}
                {/*/!*                                value={title.value}*!/*/}
                {/*/!*                                onSelect={(currentValue) => {*!/*/}
                {/*/!*                                    setValue3(currentValue === value3 ? "" : currentValue)*!/*/}
                {/*/!*                                    setOpen3(false)*!/*/}
                {/*/!*                                }}*!/*/}
                {/*/!*                            >*!/*/}
                {/*/!*                                <Check*!/*/}
                {/*/!*                                    className={cn(*!/*/}
                {/*/!*                                        "mr-2 h-4 w-4",*!/*/}
                {/*/!*                                        value3 === title.value ? "opacity-100" : "opacity-0"*!/*/}
                {/*/!*                                    )}*!/*/}
                {/*/!*                                />*!/*/}
                {/*/!*                                {title.label}*!/*/}
                {/*/!*                            </CommandItem>*!/*/}
                {/*/!*                        ))}*!/*/}
                {/*/!*                    </CommandGroup>*!/*/}
                {/*/!*                </CommandList>*!/*/}
                {/*/!*            </Command>*!/*/}
                {/*/!*        </PopoverContent>*!/*/}
                {/*/!*    </Popover>*!/*/}
                {/*/!*</div>*!/*/}


                <form onSubmit={handleSubmit}>
                    {/*Всплывающие списки*/}
                    <div className={"flex flex-row mt-4 gap-1"}>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-[200px] bg-white text-black">
                                <SelectValue placeholder="Категория"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TypeScript">TypeScript</SelectItem>
                                <SelectItem value="Math">Математика</SelectItem>
                                <SelectItem value="Physic">Физика</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={difficulty} onValueChange={setDifficulty}>
                            <SelectTrigger className="w-[200px] bg-white text-black">
                                <SelectValue placeholder="Сложность"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="JUNIOR">Junior</SelectItem>
                                <SelectItem value="Math"> MIDDLE</SelectItem>
                                <SelectItem value="Physic">SENIOR</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={title} onValueChange={setTitle}>
                            <SelectTrigger className="w-[200px] bg-white text-black">
                                <SelectValue placeholder="Тема"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Циклы">Циклы</SelectItem>
                                <SelectItem value="Math">Операторы</SelectItem>
                                <SelectItem value="Physic">Ассинхронность</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>

                    {/*Ввод имени и кнопка Начать занятие*/}
                    <div className={"w-full flex flex-col justify-center items-center mt-2"}>
                        <input className={styles.input} placeholder={"Введите Ваше имя"} type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                        <button type="submit" className={"mt-8 text-sm pt-2  pb-2 pl-8 pr-8 rounded-xl"}>Начать
                            занятие
                        </button>
                    </div>

                </form>

                {/*Логотипы сторонних сервисов*/}
                <div className={"flex mt-auto mb-4 gap-4"}>
                    <p>Telegram</p>
                    <p>Boosty</p>
                    <p>Patreon</p>
                </div>
            </div>
        </main>
    )
};

