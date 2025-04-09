declare module 'some-package/custom-path' {
  interface Foo {
    new: string
  }
}

declare module 'some-package' {
  namespace something {
    interface Foo {
      another: string
    }
  }
}

export {}
