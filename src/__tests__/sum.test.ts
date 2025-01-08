import {sum}  from "@/utils/sum.function";
// const sum = (a: number, b: number)=>{
//     return a+b;
// }

test("", ()=>{
    expect(sum(2, 3)).toBe(5);
})