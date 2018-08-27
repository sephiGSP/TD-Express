import should from 'should'

function add(a, b){
    return a + b
}

describe('mon premier groupe de test', () => {
    describe('Test add with numbers', () => {
        it('should be successful', () => {
            should.equal(add(2, 2), 4)
        })
    })
    describe('Test add with string', () => {
        it('should concat two strings', () => {
            should.equal(add('a', 'b'), 'ab')
        })
    })
    
})