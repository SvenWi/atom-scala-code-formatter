# scala-code-formatter package

This Package adds scala formatting capabilities to Atom using the tool [scalafmt](http://scalameta.org/scalafmt).

As a example:

```scala
object NeedsFormat { def too(much:Int, stuff: String, in: Int, a: String, line: Int): String = stuff }
```

will be formatted to:

```scala
object NeedsFormat {
  def too(much: Int, stuff: String, in: Int, a: String, line: Int): String =
    stuff
}
```

## Requirements

* JVM (openjdk, oracle jre)

## Usage

* Format the current scala file (hotkey ctrl-alt-x)

## Configuration

See Scalafmt http://scalameta.org/scalafmt/#Configuration for further details.

## Thanks

* to the scalafmt Team for the awesome tool (scalameta/scalafmt is licensed under the
Apache License 2.0 [licence](https://github.com/scalameta/scalafmt/blob/master/LICENCE.md))
