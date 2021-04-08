import {inchesToCentimeters,calculateBMR,calculateCalories} from './../Setup';

// note that this function is outside of the component and exported.
describe('unit testing setup functions', () => {
    test("should return 165.1cm",() => {
       expect(inchesToCentimeters(5,5)).toBe(165);
    });

    test("should return bmr,",() => {
        expect(calculateBMR("Male",140,165.1,21)).toBe(1566);
    });

    test("should caloric needs,",() => {
        expect(calculateCalories(1566,"bmi")).toBe(1567);
    });
    test("should caloric needs,",() => {
        expect(calculateCalories(1566,"moderately-active")).toBe(2427);
    });

})
    


