const P = 31;
const M = 4987793;

/**
 * Polynomial rolling hash function for lowercase string keys.
 * Returns hash values from 0 to m-1 inclusive
 * @link https://www.geeksforgeeks.org/string-hashing-using-polynomial-rolling-hash-function/
 * @param s string to be hashed
 * @param p default 31 for lowercase strings
 * @param m large prime, default 4987793, collision probability is 1/m
 * @returns hash value between 0 and (m-1) inclusive, or -1 if input parameteres aren't valid
 */
export default function polynomialRollingHash(s: string, p=P, m=M): number {
    if(p < 1 || m < 1) throw new Error(`Neither p (${p}) nor m (${m}), can be less than 1`);

    let hash = 0;
    let ppow = 1;
    
    for(let i = 0; i < s.length; ++i) {
        hash = (hash + (s.charCodeAt(i) - 97 + 1) * ppow) % m;
        ppow = (ppow * p) % m; 
    }

    return hash;
}