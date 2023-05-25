describe('test cb', () => {
    it('测试', () => {
        const fn = (cb) => {
            cb('hello')
        }
        fn((data) => {
            expect(data).toBe('hello')
        })
    })
})
