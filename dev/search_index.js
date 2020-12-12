var documenterSearchIndex = {"docs":
[{"location":"reference/#Reference","page":"Reference","title":"Reference","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"Modules = [HypertextLiteral]\nPrivate = true","category":"page"},{"location":"reference/#HypertextLiteral.HypertextLiteral","page":"Reference","title":"HypertextLiteral.HypertextLiteral","text":"HypertextLiteral\n\nThis library provides for a @htl() macro and a htl string literal, both implementing interpolation that is aware of hypertext escape context. The @htl macro has the advantage of using Julia's native string parsing, so that it can handle arbitrarily deep nesting. However, it is a more verbose than the htl string literal and doesn't permit interpolated string literals. Conversely, the htl string literal, @htl_str, uses custom parsing letting it handle string literal escaping, however, it can only be used two levels deep (using three quotes for the outer nesting, and a single double quote for the inner).\n\n\n\n\n\n","category":"module"},{"location":"reference/#HypertextLiteral.Attribute","page":"Reference","title":"HypertextLiteral.Attribute","text":"Attribute{name}\n\nThis parameterized type to represent HTML attributes so that we could dispatch serialization of custom attributes and data types. This is modeled upon the MIME data type. Values written in this way must be escaped for single-quoted context (' => \"&apos;\", & => \"&amp;\").\n\n\n\n\n\n","category":"type"},{"location":"reference/#HypertextLiteral.Result","page":"Reference","title":"HypertextLiteral.Result","text":"Result(expr, xs...)\n\nCreate an object that is showable to \"text/html\" created from arguments that are also showable. Leaf entries can be created using HTML. This expression additionally has an expression which is used when displaying the object to the REPL. Calling print will produce rendered output.\n\n\n\n\n\n","category":"type"},{"location":"reference/#HypertextLiteral.attribute_pair-Tuple{Any,Any}","page":"Reference","title":"HypertextLiteral.attribute_pair","text":"attribute_pair(attribute, value)\n\nWrap and escape attribute name and pair within a single-quoted context so that it is showable(\"text/html\"). This uses stringify to do the actual conversion of the attribute to a usable string value. If an attribute is_boolean it is given special treatment, for true values, the attribute is printed with an empty string, else it is omitted. Moreover, attributes with value of nothing are coalesced to the empty string (unless they are boolean, in which case they are omitted).\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.attributes-Tuple{Symbol,Pair}","page":"Reference","title":"HypertextLiteral.attributes","text":"attributes(element::Symbol, value)\n\nConvert Julian object into a serialization of attribute pairs, showable via MIME\"text/html\". The default implementation of this delegates value construction of each pair to attribute_pair().\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.content-Tuple{Any}","page":"Reference","title":"HypertextLiteral.content","text":"content(value)\n\nWrap and escape content so that it is showable(\"text/html\"). By default, we handle strings, numbers and symbols by escaping them. Tuples, arrays and generators are wrapped by concatenating their elements. As a fallback, we assume the value has implemented show() for MIME\"text/html\", if not, a MethodError will result.\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.css_value-Tuple{Symbol}","page":"Reference","title":"HypertextLiteral.css_value","text":"css_value(val)\n\nConvert a native Julia object into a string suitable for use as a CSS value. This is useful for adding support for cssunits or other tools that build CSS fragments.\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.double_quoted-Tuple{Any,Any}","page":"Reference","title":"HypertextLiteral.double_quoted","text":"double_quoted(attribute, value)\n\nWrap and escape a double-quoted attribute value so that it is showable(\"text/html\"). This uses stringify to do the actual conversion of the attribute to a usable string value.\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.escape_content-Tuple{Any}","page":"Reference","title":"HypertextLiteral.escape_content","text":"escape_content(value)\n\nEscape a string value for use within HTML content, this includes replacing & with &amp; and < with &lt;. We're not further escaping quotes within content since benchmarking shows us that it adds about 10% on the runtime for each character escaped.\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.htl_escape_value-Tuple{AbstractString}","page":"Reference","title":"HypertextLiteral.htl_escape_value","text":"htl_escape_value(s)\n\nPerform extensive escaping needed for a string to be used as an unquoted attribute. This can also be used for quoted values or within element content (although it's overkill in those contexts).\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.interpolate-Tuple{Any,Any}","page":"Reference","title":"HypertextLiteral.interpolate","text":"interpolate(args, this)::Expr\n\nTake an interweaved set of Julia expressions and strings, tokenize the strings according to the HTML specification [1], wrapping the expressions with wrappers based upon the escaping context, and returning an expression that combines the result with an Result wrapper.\n\nFor these purposes, a Symbol is treated as an expression to be resolved; while a String is treated as a literal string that won't be escaped. Critically, interpolated strings to be escaped are represented as an Expr with head of :string.\n\nThere are tags, \"script\" and \"style\" which are rawtext, in these cases there is no escaping, and instead raise an exception if the appropriate ending tag is in substituted content.\n\n[1] https://html.spec.whatwg.org/multipage/parsing.html#tokenization\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.interpolate_attributes-Tuple{Symbol,Any}","page":"Reference","title":"HypertextLiteral.interpolate_attributes","text":"interpolate_attributes(element, expr)::Vector{Expr}\n\nContinue conversion of an arbitrary Julia expression within the attribute section of the given element.\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.is_boolean-Union{Tuple{HypertextLiteral.Attribute{name}}, Tuple{name}} where name","page":"Reference","title":"HypertextLiteral.is_boolean","text":"is_boolean(attribute::Attribute)\n\nThis function returns true if the given attribute is boolean. In in such case, false or nothing means the attribute should be removed from the produced output. Note that there are some HTML attributes which may take a boolean value but that produce on or off, or something else. Those attributes are not considered boolean.\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.kebab_case-Tuple{String}","page":"Reference","title":"HypertextLiteral.kebab_case","text":"kebab_case(s)\n\nThis converts an name in PascalCase, camelCase, and snake_case into their kebab-case equivalent. This will lowercase the name. This transformation is problematic for SVG attribute names, which need to be in camelCase.\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.rawtext-Tuple{Symbol,AbstractString}","page":"Reference","title":"HypertextLiteral.rawtext","text":"rawtext(context, value)\n\nWrap a string value that occurs with RAWTEXT, SCRIPT and other element context so that it is showable(\"text/html\"). The default implementation ensures that the given value doesn't contain substrings illegal for the given context.\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.single_quoted-Tuple{Any,Any}","page":"Reference","title":"HypertextLiteral.single_quoted","text":"single_quoted(attribute, value)\n\nWrap and escape a single-quoted attribute value so that it is showable(\"text/html\"). This uses stringify to do the actual conversion of the attribute to a usable string value.\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.stringify-Tuple{HypertextLiteral.Attribute,AbstractString}","page":"Reference","title":"HypertextLiteral.stringify","text":"stringify(attribute::Attribute, value)\n\nConvert an attribute valueto aString` suitable for inclusion into the given attribute's value. The value returned will then be escaped depending upon the particular context, single/double or unquoted.\n\nString values are returned as-is\nNumber and Symbol values are converted to a String\nBool values of known boolean attributes produce an error.\nNothing becomes an empty string (unless for boolean attribute).\n\nThere is no general fallback, hence, a MethodError will result when attempting to stringify most data types. If your application would like to stringify all attribute values, you could register this fallback.\n\nstringify(::Attribute, value) = string(value)\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.stringify-Union{Tuple{HypertextLiteral.Attribute{name}}, Tuple{name}} where name","page":"Reference","title":"HypertextLiteral.stringify","text":"stringify(a::Attribute{name})\n\nThis provides the serialization of a given normalized attribute so that camelCase could be preserved on output for elements foreign to HTML, such as SVG. By default, about 2 dozen SVG attributes are defined.\n\n\n\n\n\n","category":"method"},{"location":"reference/#HypertextLiteral.@htl-Tuple{Any}","page":"Reference","title":"HypertextLiteral.@htl","text":"@htl string-expression\n\nCreate a Result object with string interpolation ($) that uses context-sensitive hypertext escaping. Before Julia 1.6, interpolated string literals, e.g. $(\"Strunk & White\"), are treated as errors since they cannot be reliably detected (see Julia issue #38501).\n\n\n\n\n\n","category":"macro"},{"location":"reference/#HypertextLiteral.@htl_str-Tuple{String}","page":"Reference","title":"HypertextLiteral.@htl_str","text":"@htl_str -> Result\n\nCreate a Result object with string interpolation ($) that uses context-sensitive hypertext escaping. Escape sequences should work identically to Julia strings, except in cases where a slash immediately precedes the double quote (see @raw_str and Julia issue #22926).\n\nInterpolation is extended beyond regular Julia strings to handle three additional cases: tuples, named tuples (for attributes), and generators. See Julia #38734 for the feature request so that this could also work within the @htl macro syntax.\n\n\n\n\n\n","category":"macro"},{"location":"#HypertextLiteral.jl","page":"Tutorial","title":"HypertextLiteral.jl","text":"","category":"section"},{"location":"","page":"Tutorial","title":"Tutorial","text":"This package provides a Julia string literal, htl, and equivalent macro, @htl, that construct an object that could be rendered to MIME\"text/html\" displays. These macros support context-sensitive interpolation sensible to the needs of HTML generation.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"using HypertextLiteral","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"When printed directly to the console (via show), the output of these macros reproduce a verified expression that generated them.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"name = \"World\"\n\nhtl\"<span>Hello $name</span>\"\n#-> htl\"<span>Hello $name</span>\"\n\n@htl(\"<span>Hello $name</span>\")\n#-> @htl \"<span>Hello $(name)</span>\"","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"When displayed to \"text/html\" the evaluation is shown.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"name = \"World\"\n\ndisplay(\"text/html\", htl\"<span>Hello $name</span>\")\n#-> <span>Hello World</span>\n\ndisplay(\"text/html\", @htl(\"<span>Hello $name</span>\"))\n#-> <span>Hello World</span>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"We use NarrativeTest.jl to ensure our examples are correct. After each command is a comment with the expected output. To enhance readability, we'll also use the following macro.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"macro print(expr)\n    :(display(\"text/html\", $expr))\nend\n\n@print htl\"<span>Hello World</span>\"\n#-> <span>Hello World</span>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Thoughout this tutorial, we'll mostly stick with the string literal form of this macro, however, the @htl macro form should work equivalently, except for a few cases we annotate.","category":"page"},{"location":"#Content-Interpolation","page":"Tutorial","title":"Content Interpolation","text":"","category":"section"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Hypertext literal provides interpolation via $. Within element content, both the ampersand (&) and less-than (<) are escaped.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"book = \"Strunk & White\"\n\n@print @htl(\"<span>Today's Reading: $book</span>\")\n#-> <span>Today's Reading: Strunk &amp; White</span>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"To include a literal $ in the output, use \\$ as one would in a regular Julia string. Other escape sequences, such as \\\" also work.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print htl\"They said, \\\"your total is \\$42.50\\\".\"\n#-> They said, \"your total is $42.50\".","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"String literals can also be triple-quoted, allowing them to span multiple lines. Within triple quotes, single quoted strings can go unescaped, however, we still need to escape the dollar sign ($).","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print htl\"\"\"They said, \"your total is \\$42.50\".\"\"\"\n#-> They said, \"your total is $42.50\".","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Within any of these forms, Julia results can be interpolated using the $(expr) notation. Numeric values (including Bool) and symbols are automatically converted to their string representation.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print htl\"2+2 = $(2+2)\"\n#-> 2+2 = 4\n\n@print htl\"<bool>$(false)</bool><sym>$(:sym)</sym>\"\n#-> <bool>false</bool><sym>sym</sym>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Functions returning string values will be escaped.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"input() = \"<script>alert('a&b!')\"\n\n@print htl\"$(input())\"\n#-> &lt;script>alert('a&amp;b!')","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Functions returning HTL objects are not further escaped. This permits us to build reusable HTML templates.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"sq(x) = htl\"<span>$(x*x)</span>\"\n\n@print htl\"<div>3^2 is $(sq(3))</div>\"\n#-> <div>3^2 is <span>9</span></div>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Within a triple double-quoted htl string, a single double-quoted htl string can be included. This technique works for one level of nesting.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"books = [\"Who Gets What & Why\", \"Switch\", \"Governing The Commons\"]\n\n@print htl\"\"\"<ul>$([htl\"<li>$b\" for b in books])</ul>\"\"\"\n#=>\n<ul><li>Who Gets What &amp; Why<li>Switch<li>Governing The Commons</ul>\n=#","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"The equivalent macro syntax supports arbitrary levels of nesting, although we only show one level of nesting here.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"books = [\"Who Gets What & Why\", \"Switch\", \"Governing The Commons\"]\n\n@print @htl(\"<ul>$(map(books) do b @htl(\"<li>$b\") end)</ul>\")\n#=>\n<ul><li>Who Gets What &amp; Why<li>Switch<li>Governing The Commons</ul>\n=#","category":"page"},{"location":"#Attribute-Interpolation","page":"Tutorial","title":"Attribute Interpolation","text":"","category":"section"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Escaping of Julia values depends upon the context: within a double quoted attribute value, the double quote is escaped; single quoted attributes are likewise escaped.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"qval = \"\\\"h&b'\"\n\n@print htl\"\"\"<tag double=\"$qval\" single='$qval' />\"\"\"\n#-> <tag double=\"&quot;h&amp;b'\" single='\"h&amp;b&apos;' />","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Unquoted attributes are also supported. These are serialized using the single quoted style.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"arg = \"book='Strunk & White'\"\n\n@print htl\"<tag bare=$arg />\"\n#-> <tag bare='book=&apos;Strunk &amp; White&apos;' />","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Attributes may also be provided by Dict or Pair. Attribute names are normalized, with camelCase and snake_case becoming kebab-case.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":" attributes = Dict(:dataValue => 42, :data_style => :green )\n\n @print @htl(\"<div $attributes/>\")\n #-> <div data-value='42' data-style='green'/>\n\n @print @htl(\"<div $(:data_value=>42) $(\"dataStyle\"=>:green)/>\")\n #-> <div data-value='42' data-style='green'/>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Within string literals (but not @htl macro), a compact syntax inspired by named tuples is also supported.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":" @print htl\"<div $(data_value=42, dataStyle=:green)/>\"\n #-> <div data-value='42' data-style='green'/>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"As you can see from this example, symbols and numbers (but not boolean values) are automatically converted within attributes. This works for quoted values as well.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print htl\"\"\"<tag numeric=\"$(0)\" symbol='$(:sym)'/>\"\"\"\n#-> <tag numeric=\"0\" symbol='sym'/>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Within bare attributes, boolean values provide special support for boolean HTML properties, such as \"disabled\". When a bare value false then the attribute is removed. When the value is true then the attribute is kept, with value being an empty string ('').","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print htl\"<button checked=$(true) disabled=$(false)>\"\n#-> <button checked=''>","category":"page"},{"location":"#Cascading-Style-Sheets","page":"Tutorial","title":"Cascading Style Sheets","text":"","category":"section"},{"location":"","page":"Tutorial","title":"Tutorial","text":"There is special support for the unquoted \"style\" attribute. In this case, Pair and Dict values are expanded as style attributes separated by the semi-colon (;). Style names that are Symbol values go though camelCase conversion to camel-case, while String values are passed along as-is.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"header_styles = Dict(:fontSize => \"25px\", \"padding-left\" => \"2em\")\n\n@print htl\"<div style=$header_styles/>\"\n#-> <div style='font-size: 25px;padding-left: 2em;'/>\n\n@print htl\"\"\"<div style=$(:fontSize=>\"25px\",\"padding-left\"=>\"2em\")/>\"\"\"\n#-> <div style='font-size: 25px;padding-left: 2em;'/>\n\n@print htl\"\"\"<div style=$(fontSize=\"25px\",paddingLeft=\"2em\")/>\"\"\"\n#-> <div style='font-size: 25px;padding-left: 2em;'/>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Only symbols, numbers, and strings have a specified serialization as css style values. Therefore, use of components from other libraries will cause an exception.  However, this can be fixed by registering a conversion using css_value().","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"using Hyperscript\n\nHypertextLiteral.css_value(x::Hyperscript.Unit) = string(x)","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Then, the syntax for CSS can be even more compact.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print htl\"<div style=$(fontSize=25px,paddingLeft=2em)/>\"\n#-> <div style='font-size: 25px;padding-left: 2em;'/>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"For the unquoted \"class\" attribute, a Vector provides a space between each of the elements.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print @htl(\"<div class=$([:one, :two])/>\")\n#-> <div class='one two'/>\n\n@print htl\"<div class=$(:one, :two)/>\"\n#-> <div class='one two'/>","category":"page"},{"location":"#Custom-Extensions","page":"Tutorial","title":"Custom Extensions","text":"","category":"section"},{"location":"","page":"Tutorial","title":"Tutorial","text":"We've seen our first extension, but it is specific to CSS. But how can we serialize a custom data object within an interpolated result? If one attempts to reference a user defined type, it will be an error.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"struct Custom data::String end\n\n@print @htl \"$(Custom(\"a&b\"))</tag>\"\n#-> ERROR: MethodError: no method matching show(…\"text/html\"…Custom)⋮","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"This can be addressed by implementing the \"text/html\" mimetype inBase.showfor the custom type in question. In this case, be sure to escape ampersand (&) and less-than (<). This could be done usingreplaceor by using ourescape_content` method.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":" struct Custom data::String end\n\n using HypertextLiteral: escape_content\n\n function Base.show(io::IO, mime::MIME\"text/html\", c::Custom)\n     value = escape_content(c.data)\n     print(io, \"<custom>$(value)</custom>\")\n end\n\n @print @htl(\"<span>$(Custom(\"a&b\"))</span>\")\n #-> <span><custom>a&amp;b</custom></span>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"This approach of using show(io, MIME\"text/html\"(), ...) lets us support many other systems out of the box without needing any glue.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"using Hyperscript\n@tags span\n\n@print @htl(\"<div>$(span(\"Hello World\"))</div>\")\n#-> <div><span>Hello World</span></div>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Displaying an object within an attribute...","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"#TODO: show how this works here.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"It's also possible to let us know that your custom attribute uses boolean attribute treatment.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"import HypertextLiteral: is_boolean, Attribute\n\nis_boolean(::Attribute{Symbol(\"my-att\")}) = true\n\n@print @htl(\"<tag myAtt=$(false)/>\")\n#-> <tag/>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"So that the scope of objects serialized in this manner is clear, we don't permit adjacent unquoted values.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"htl\"<tag bare=$(true)$(:invalid)\"\n#=>\nERROR: LoadError: DomainError with :invalid:\nUnquoted attribute interpolation is limited to a single component⋮\n=#","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"To have a convenient notation, our string macro syntax interpolate tuples and generated expressions as concatenated output. This is currently not supported by @htl macro (see Julia ticket amp734).","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"a = \"A\"\nb = \"B\"\n\n@print htl\"$(a,b)\"\n#-> AB\n\n@print htl\"$(x for x in (a,b))\"\n#-> AB\n\n@htl(\"$(x for x in (a,b))\")\n#-> ERROR: syntax: invalid interpolation syntax","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"While assignment operator is permitted in Julia string interpolation, we exclude it in both string literal and macro forms so to guard against accidentally forgetting the trailing comma for a 1-tuple.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print htl\"\"\"<div $(dataValue=42,)/>\"\"\"\n#-> <div data-value='42'/>\n\nhtl\"\"\"<div $(dataValue=42)/>\"\"\"\n#=>\nERROR: LoadError: DomainError with dataValue = 42:\nassignments are not permitted in an interpolation⋮\n=#\n\n@htl(\"<div $(dataValue=42)/>\")\n#=>\nERROR: LoadError: DomainError with dataValue = 42:\nassignments are not permitted in an interpolation⋮\n=#","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Even though booleans are considered numeric in Julia, we treat them as an error to guard against quoted use in boolean HTML attributes.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"htl\"<button checked='$(true)'\"\n#=>\nERROR: DomainError with true:\nThe attribute 'checked' is boolean, use unquoted attribute form.\n=#","category":"page"},{"location":"#Quirks-and-Regression","page":"Tutorial","title":"Quirks & Regression","text":"","category":"section"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Since this string format uses Julia macro processing, there are some differences between an htl literal and native Julia interpolation. For starters, Julia doesn't recognize and treat $ syntax natively for these macros, hence, at a very deep level parsing is different.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"\"$(\"Hello\")\"\n#-> \"Hello\"","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"In this interpolation, the expression \"Hello\" is seen as a string, and hence Julia can produce the above output. However, Julia does not given this special treatment to string literals. Hence, if you try this expression using htl you'll get an error.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"htl\"$(\"Hello\")\"\n#-> ERROR: syntax: cannot juxtapose string literal","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"The above expression is seen by Julia as 3 tokens, htl\"$(\", followed by Hello, and then \"). This combination is a syntax error. One might correct this using triple strings.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"htl\"\"\"$(\"Hello\")\"\"\"\n#-> htl\"$(\\\"Hello\\\")\"","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Alternatively, in Julia v1.6+, one could use the @htl macro format for cases where there are string literals.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"#? VERSION >= v\"1.6.0-DEV\"\n@htl \"$(\"Hello\")\"\n#-> @htl \"$(\"Hello\")\"","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Before v1.6, we cannot reliably detect interpolated string literals using the @htl macro, so they are errors (when we can detect them).","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"#? VERSION < v\"1.6.0-DEV\"\n@print @htl \"Look, Ma, $(\"<i>automatic escaping</i>\")!\"\n#-> ERROR: LoadError: \"interpolated string literals are not supported\"⋮","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"However, you can fix by wrapping a value in a string function.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print @htl \"Look, Ma, $(string(\"<i>automatic escaping</i>\"))!\"\n#-> Look, Ma, &lt;i>automatic escaping&lt;/i>!","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"The string literal style is not without its quirks. See @raw_str for exceptional cases where a slash immediately precedes the double quote. This is one case where the htl string macro cannot be made to work in a manner identical to regular string interpolation.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print htl\"(\\\\\\\")\"\n#-> (\")\n\n@print @htl(\"(\\\\\\\")\")\n#-> (\\\")","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"In Julia, to support regular expressions and other formats, string literals don't provide regular escaping semantics. This package adds those semantics.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"htl\"Hello\\World\"\n#-> ERROR: LoadError: ArgumentError: invalid escape sequence⋮\n\n@htl \"Hello\\World\"\n#-> ERROR: syntax: invalid escape sequence⋮","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Escaped strings should just pass-though.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print htl\"\\\"\\t\\\\\"\n#-> \"\t\\\n\n@print @htl(\"\\\"\\t\\\\\")\n#-> \"\t\\","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Within attributes, independent of quoting style, other datatypes are treated as an error. This includes Vector as well as HTL objects.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"htl\"<tag att='$([1,2,3])'\"\n#-> ERROR: MethodError: no method matching stringify⋮","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Symbols are also properly handled; e.g. escaping happens after conversion of numbers, symbols and custom types to strings.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print htl\"\"\"<tag att=$(Symbol(\"'&\"))>$(Symbol(\"<&\"))</tag>\"\"\"\n#-> <tag att='&apos;&amp;'>&lt;&amp;</tag>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Interpolation should handle splat operator by concatenating results.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print htl\"$([x for x in 1:3]...)\"\n#-> 123\n\n@print @htl \"$([x for x in 1:3]...)\"\n#-> 123","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Within element content, we treat a Vector as a sequence to be containated.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print htl\"$([x for x in 1:3])\"\n#-> 123\n\n@print @htl \"$([x for x in 1:3])\"\n#-> 123","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"The script and style tags use a \"raw text\" encoding where all content up-to the end tag is not escaped using ampersands.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"book = \"Strunk & White\"\n@print htl\"\"\"<script>var book = \"$book\"</script>\"\"\"\n#-> <script>var book = \"Strunk & White\"</script>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"We throw an error if the end tag is accidently included.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"bad = \"</style>\"\n\nhtl\"\"\"<style>$bad</style>\"\"\"\n#=>\nERROR: DomainError with \"</style>\":\n  Content of <style> cannot contain the end tag (`</style>`).\n=#","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Attribute names should be non-empty and not in a list of excluded characters.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@htl(\"<tag $(\"\" => \"value\")/>\")\n#=>\nERROR: DomainError with :\nAttribute name must not be empty.\n=#\n\n@htl(\"<tag $(\"&att\" => \"value\")/>\")\n#=>\nERROR: DomainError with &att:\nInvalid character ('&') found within an attribute name.\n=#","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Unquoted interpolation adjacent to a raw string is also an error.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"htl\"<tag bare=literal$(:invalid)\"\n#=>\nERROR: LoadError: DomainError with :invalid:\nUnquoted attribute interpolation is limited to a single component⋮\n=#\n\nhtl\"<tag bare=$(invalid)literal\"\n#=>\nERROR: LoadError: DomainError with bare=literal:\nUnquoted attribute interpolation is limited to a single component⋮\n=#","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"We limit string interpolation to symbols or parenthesized expressions. For more details on this see Julia #37817.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"htl\"$[1,2,3]\"\n#=>\nERROR: LoadError: DomainError with [1, 2, 3]:\ninterpolations must be symbols or parenthesized⋮\n=#\n\n@htl(\"$[1,2,3]\")\n#=>\nERROR: syntax: invalid interpolation syntax: \"$[\"⋮\n=#","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Before Julia v1.6 (see issue amp501), string literals should not be used within the macro style since we cannot reliably detect them.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"x = \"\"\n\n@print htl\"\"\"$x$(\"<script>alert('Hello')</script>\")\"\"\"\n#-> &lt;script>alert('Hello')&lt;/script>\n\n#? VERSION >= v\"1.6.0-DEV\"\n@print htl\"\"\"$x$(\"<script>alert('Hello')</script>\")\"\"\"\n#-> &lt;script>alert('Hello')&lt;/script>\n\n#? VERSION < v\"1.6.0-DEV\"\n@print @htl(\"$x$(\"<script>alert(\\\"Hello\\\")</script>\")\")\n#-> <script>alert(\"Hello\")</script>","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Hence, for a cases where we could detect a string literal, we raise an error condition to discourage its use. The string macro form works.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print htl\"\"\"<tag>$(\"escape&me\")</tag>\"\"\"\n#-> <tag>escape&amp;me</tag>\n\n#? VERSION >= v\"1.6.0-DEV\"\n@print @htl \"<tag>$(\"escape&me\")</tag>\"\n#-> <tag>escape&amp;me</tag>\n\n#? VERSION < v\"1.6.0-DEV\"\n@print @htl \"<tag>$(\"escape&me\")</tag>\"\n#-> ERROR: LoadError: \"interpolated string literals are not supported\"⋮","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"A string ending with $ is an syntax error since it is an incomplete interpolation.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"@print htl\"$\"\n#-> ERROR: LoadError: \"missing interpolation expression\"⋮\n\n@print htl\"Foo$\"\n#-> ERROR: LoadError: \"missing interpolation expression\"⋮","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Here's something that perhaps should work... but fails currently.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"# htl\"<div $(:dataValue=>42, \"data-style\"=>:green)/>","category":"page"},{"location":"#Contributing","page":"Tutorial","title":"Contributing","text":"","category":"section"},{"location":"","page":"Tutorial","title":"Tutorial","text":"We are absolutely open to suggested improvements. This package is implemented according to several design criteria.","category":"page"},{"location":"","page":"Tutorial","title":"Tutorial","text":"Operation of interpolated expressions ($) should mirror what they would do with regular Julia strings, updated with hypertext escaping sensibilities including proper escaping and helpful representations.\nWith exception of boolean attributes (which must be removed to be false), input is treated as-is and not otherwise modified.\nValues having serialization to \"text/html\" are injected \"as-is\" into element content. Attributes should only accept string objects.\nGiven that this library will be used by content producers, it should be conservative, raising an error when invalid hypertext is discovered and only serializing Julia objects that have an express representation.\nThere should be an extension API that permits custom data types to provide their own context-sensitive serialization strategies.\nAs much processing (e.g. hypertext lexical analysis) should be done during macro expansion to reduce runtime and to report errors early. Error messages should guide the user towards addressing the problem.\nTo be helpful, HTML tags and attributes may be recognized. Special behavior may be provided to attributes such as \"style\" (CSS), \"class\" and, eventually, \"script\".\nFull coverage of HTML syntax is ideal, but unnecessary.","category":"page"}]
}
