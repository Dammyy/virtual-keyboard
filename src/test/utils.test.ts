import { toMatrix, toIndex } from '../utils'

test('returns correct matrix', () => {
  expect(toMatrix(0)).toStrictEqual({ i: 0, j: 0 })
})

test('returns correct index', () => {
  expect(toIndex({ i: 0, j: 0 })).toStrictEqual(0)
})
