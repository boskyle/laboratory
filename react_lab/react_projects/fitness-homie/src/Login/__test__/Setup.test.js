import React from 'react';
import ReactDOM from 'react-dom';
import Setup from './../Setup';
import {inchesToCentimeters,calculateBMR,calculateCalories} from './../Setup';







    test("renders without rashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Setup/>,div);
    })


  
// note that this function is outside of the component and exported.
describe('testing setup functions', () => {
    console.log("testing!");
    test("should return 165.1cm",() => {
       expect(inchesToCentimeters(5,5)).toBe(165);
    });

    test("should return bmr,",() => {
        expect(calculateBMR("Male",140,165.1,21)).toBe(1566);
    });

    test("should caloric needs,",() => {
        expect(calculateCalories(1566,"sedentary")).toBe(1566);
    });
    test("should caloric needs,",() => {
        expect(calculateCalories(1566,"moderately-active")).toBe(2427);
    });

})
    


