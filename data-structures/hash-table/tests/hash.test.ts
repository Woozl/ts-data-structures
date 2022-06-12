import polynomialRollingHash from "../hash";

describe('polynomialRollingHash', () => {
    it('should correctly process rolling string hash', () => {
        expect(polynomialRollingHash("test string")).toBe(740568);
    });

    it('should calculate the same hash for the same input', () => {
        expect(polynomialRollingHash("repeat this")).toBe(1084487);
        expect(polynomialRollingHash("repeat this")).toBe(1084487);
    });

    it('should generate relatively few collisions', () => {
        // 25 words into 47 buckets expect <= 2 collisions
        let words = ['realize','jewel','coal','terrify','petite','desire','confuse','replace','unlock','stew','jam','dynamic','modern','yellow','creator','ignore','miscreant','library','unsuitable','fumbling','ahead','steam','bake','mushy','amazing'];
        let buckets = new Array(47).fill(0);
        words.forEach(w => {
            ++buckets[polynomialRollingHash(w, 7, 47)];
        });
        expect(buckets.every(bucket => bucket <= 2)).toBe(true);
    });
});