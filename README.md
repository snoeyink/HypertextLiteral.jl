# HypertextLiteral.jl

*HypertextLiteral is a Julia package for generating [HTML][html],
[SVG][svg], and other [SGML][sgml] tagged content. It works similar to
Julia string interpolation, only that it tracks hypertext escaping needs
and provides handy conversions dependent upon context.*

> This project is inspired by [Hypertext Literal][htl] by Mike Bostock
> ([@mbostock][@mbostock]). You can read more about it
> [here][observablehq].

This package provides a Julia string literal, `htl`, and macro `@htl`
that build an `HTML` object from a string template using Julia's
interpolation syntax. These operations take the hypertext syntax into
account, providing context-sensitive escaping and object serializations.
Here we show an example using triple-quoted `htl` string literal, notice
how ampersands are properly escaped in the book name and author listing.

    using HypertextLiteral

    books = [
     (name="Who Gets What & Why", year=2012, authors=["Alvin Roth"]),
     (name="Switch", year=2010, authors=["Chip Heath", "Dan Heath"]),
     (name="Governing The Commons", year=1990, authors=["Elinor Ostrom"]),
     (name="Peopleware", year=1987, authors=["Tom Demarco", "Tim Lister"])]

    render_row(book) = htl"""
      <tr><td>$(book.name) ($(book.year))<td>$(join(book.authors, " & "))
    """

    render_table(books) = htl"""
      <table><caption><h3>Selected Books</h3></caption>
      <thead><tr><th>Book<th>Authors<tbody>
      $([render_row(b) for b in books])</tbody></table>"""

    display("text/html", render_table(books))
    #=>
    <table><caption><h3>Selected Books</h3></caption>
    <thead><tr><th>Book<th>Authors<tbody>
      <tr><td>Who Gets What &amp; Why (2012)<td>Alvin Roth
      <tr><td>Switch (2010)<td>Chip Heath &amp; Dan Heath
      <tr><td>Governing The Commons (1990)<td>Elinor Ostrom
      <tr><td>Peopleware (1987)<td>Tom Demarco &amp; Tim Lister
    </tbody></table>
    =#

We use [NarrativeTest][nt] to ensure our examples are correct. After
each command is a comment with the expected output. This README can be
validated by running `./test/runtests.jl` on the command line.

## Basic Operations

This package, `HypertextLiteral` provides an `htl` string literal and
`@htl` function macro which produce `HTML` objects, implementing common
interpolation patterns and convenient data conversions.

    using HypertextLiteral

    book = "Strunk & White"

    htl"<span>Today's Reading: $book</span>"
    #-> HTML{String}("<span>Today's Reading: Strunk &amp; White</span>")

Besides simple string interpolation, there is an implicit conversion of
`Number` values to their `String` representation.

    var = 3

    htl"$var"
    #-> HTML{String}("3")

Within an `htl` string, Julia results can be interpolated.

    htl"2+2 = $(2+2)"
    #-> HTML{String}("2+2 = 4")

So that `HTML` objects are more easily viewed, let's create a `render`
macro that displays the result using the `"text/html"` mimetype.

    macro render(expr::Expr)
        Expr(:call, :display, :("text/html"), expr)
    end

    @render htl"<span>Today's Reading: $book</span>"
    #-> <span>Today's Reading: Strunk &amp; White</span>

    @render htl"$(3)"
    #-> 3

To include a literal `$` in the output string, use `\$`.

    htl"\$42.50"
    #-> HTML{String}("\$42.50")

Interpolated strings are escaped.

    var = "3<4 & 5>4"

    htl"$var"
    #-> HTML{String}("3&lt;4 &amp; 5>4")

If a variable is already a `HTML` object, it is not further escaped.

    var = html"<span>no-escape</span>"

    htl"$var"
    #-> HTML{String}("<span>no-escape</span>")

Of course, more than one variable can be interpolated.

    s = "World"
    n = 42

    htl"Hello $s, $n"
    #-> HTML{String}("Hello World, 42")

Functions returning values can be included in an interpolation, this
uses the Julia syntax `$(expr)`.

    sq(x) = x*x

    htl"3 squared is $(sq(3))"
    #-> HTML{String}("3 squared is 9")

Functions returning string values will be escaped.

    input() = "<script>alert('ouch!')"

    htl"$(input())"
    #-> HTML{String}("&lt;script>alert('ouch!')")

Functions returning HTML fragments are passed on, as-is.

    frag() = html"<span>Hello!</span>"

    htl"$(frag())"
    #-> HTML{String}("<span>Hello!</span>")

## Expression Translation

This package attempts to convert common string literal conventions from
their Julia equivalent.

    htl"""<ul>$([ htl"<li>$x</li>" for x in ["A", "B&C"]])</ul>"""
    #-> HTML{String}("<ul><li>A</li><li>B&amp;C</li></ul>")

This technique works with arbitrary Julia expressions.

    htl"""<ul>$(map(["A", "B&C"]) do x htl"<li>$x</li>" end)</ul>"""
    #-> HTML{String}("<ul><li>A</li><li>B&amp;C</li></ul>")

## HTL Macro

These same operations can be invoked using the `@htl` macro. Note that
unlike the string literal, arbitrary nesting is possible even while
using only single quotes.

    book = "Strunk & White"

    @htl("<span>Today's Reading: $book</span>")
    #-> HTML{String}("<span>Today's Reading: Strunk &amp; White</span>")

    @htl("<ul>$([ @htl("<li>$x</li>") for x in ["A", "B&C"]])</ul>")
    #-> HTML{String}("<ul><li>A</li><li>B&amp;C</li></ul>")

## Design Discussion

The Julia ecosystem provides an `HTML` data type as part of its built-in
documentation package. We use this data type to indicate that a string
value is intended to be syntactically valid hypertext.

    html"<span>Hello World!</span>"
    #-> HTML{String}("<span>Hello World!</span>")

Since the display of `HTML` objects to the terminal is wrapped, we
create a `render` macro that displays using the `"text/html"` mimetype.

    macro render(expr::Expr)
        Expr(:call, :display, :("text/html"), expr)
    end

    @render html"<span>Hello World!</span>"
    #-> <span>Hello World!</span>

Julia uses `$` for string interpolation syntax, letting local variables
or arbitrary expressions be accessed. However, it doesn't know about
proper escaping in the context of hypertext content.

    book = "Strunk & White"

    "<span>Today's Reading: $book</span>"
    #-> "<span>Today's Reading: Strunk & White</span>"

Conversely, the built-in the `html` string literal doesn't provide
interpolation, the `$` character is simply that, a dollar sign.

    html"<span>Today's Reading: $book</span>"
    #-> HTML{String}("<span>Today's Reading: \$book</span>")

The remainder of this documentation reviews functionality provided by
the `htl` string macro. We use [NarrativeTest][nt] to ensure that
examples provided here are executable. After each command is a comment
(staring with the pound sign `#`) that indicates the output expected.

## Quirks

Since this string format uses Julia macro processing, there are some
differences between an `htl` literal and native Julia interpolation.
For starters, Julia doesn't recognize and treat `$` syntax natively for
these macros, hence, at a very deep level parsing is different.

    "$("Hello")"
    #-> "Hello"

In this interpolation, the expression `"Hello"` is seen as a string,
and hence Julia can produce the above output. However, Julia does not
given this special treatment to string literals. Hence, if you try this
expression using `htl` you'll get an error.

    htl"$("Hello")"
    #-> ERROR: syntax: cannot juxtapose string literal

The above expression is seen by Julia as 3 tokens, `htl"$("`, followed
by `Hello`, and then `")`. This combination is a syntax error. One might
correct this using triple strings.

    """$("Hello")"""
    #-> "Hello"

When processed with `htl` macro, we could make it have a similar effect,
with output wrapped as a `HTML` string object.

    htl"""$("Hello")"""
    #-> HTML{String}("Hello")

Only that internal string literals like this are properly escaped.

    htl"""Look, Ma, $("<i>automatic escaping</i>")!"""
    #-> HTML{String}("Look, Ma, &lt;i>automatic escaping&lt;/i>!")

We cannot reliably detect interpolated string literals using the `@htl`
macro, so they are errors (in the cases we can find them).

    @htl "Look, Ma, $("<i>automatic escaping</i>")!"
    #-> ERROR: LoadError: "interpolated string literals are not supported"⋮

However, you can fix this by using a string.

    @htl "Look, Ma, $(string("<i>automatic escaping</i>"))!"
    #-> HTML{String}("Look, Ma, &lt;i>automatic escaping&lt;/i>!")

We can nest literal expressions, so long as the outer nesting uses
triple quotes.

    htl"""$( htl"Hello" )"""
    #-> HTML{String}("Hello")

We should be able to nest these arbitrarily deep. Perhaps this is
something we can fix...

    htl"""$( htl"$( htl"Hello" )" )"""
    #-> ERROR: LoadError: Base.Meta.ParseError⋮

## Edge Cases & Regression Tests

In Julia, to support regular expressions and other formats, string
literals don't provide regular escaping semantics. This package adds
those semantics.

    htl"Hello\World"
    #-> ERROR: LoadError: ArgumentError: invalid escape sequence⋮

    @htl "Hello\World"
    #-> ERROR: syntax: invalid escape sequence⋮

Escaped strings should just pass-though.

    htl"\"\\\n".content
    #-> "\"\\\n"

    @htl("\"\\\n").content
    #-> "\"\\\n"

Note that Julia has interesting rules when an escape precedes a double
quote, see `raw_str` for details. This is one case where the `htl`
string macro cannot be made equivalent to regular string interpretation.

    htl"\\\"\n".content
    #-> "\"\n"

    @htl("\\\"\n").content
    #-> "\\\"\n"

To prevent interpolation, use `\` for an escape.

    println(htl"\$42.00".content)
    #-> $42.00

    println(@htl("\$42.00").content)
    #-> $42.00

Interpolation should handle splat and concatenate.

    htl"$([x for x in [1,2,3]]...)"
    #-> HTML{String}("123")

    @htl "$([x for x in [1,2,3]]...)"
    #-> HTML{String}("123")

However, it shouldn't concatenate by default.

    htl"$([x for x in 1:3])"
    #=>
    ERROR: DomainError with [1, 2, 3]:
    Type Array{Int64,1} lacks an `htl_escape` specialization.
    Perhaps use splatting? e.g. htl"$([x for x in 1:3]...)"
    =#

    @htl "$([x for x in 1:3])"
    #=>
    ERROR: DomainError with [1, 2, 3]:
    Type Array{Int64,1} lacks an `htl_escape` specialization.
    Perhaps use splatting? e.g. htl"""$([x for x in 1:3]...)"""
    =#

Bare string literals cannot be used with macro either.

    @htl "$("bare")"
    #-> ERROR: LoadError: "interpolated string literals are not supported"⋮

A string ending with `$` is an syntax error since it is an incomplete
interpolation.

    htl"$"
    #-> ERROR: LoadError: "invalid interpolation syntax"⋮

    htl"Foo$"
    #-> ERROR: LoadError: "invalid interpolation syntax"⋮


[nt]: https://github.com/rbt-lang/NarrativeTest.jl
[htl]: https://github.com/observablehq/htl
[@mbostock]: https://github.com/mbostock
[@mattt]: https://github.com/mattt
[names]: https://github.com/NSHipster/HypertextLiteral
[observablehq]: https://observablehq.com/@observablehq/htl
[xml entities]: https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references
[named character references]: https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references
[xml]: https://en.wikipedia.org/wiki/XML
[sgml]: https://en.wikipedia.org/wiki/Standard_Generalized_Markup_Language
[svg]: https://en.wikipedia.org/wiki/Scalable_Vector_Graphics
[html]: https://en.wikipedia.org/wiki/HTML
