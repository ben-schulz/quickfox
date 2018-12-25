var canvas = new TextCanvas( document );

var foo = new Lexeme( "foo" );
var bar = new Lexeme( "bar" );
var cat = new Lexeme( "cat" );

canvas.addLexeme( foo );
canvas.addLexeme( bar );
canvas.addLexeme( cat );

foo.showAsReferent();
bar.showAsReferent();
cat.showAsReferent();

document.body.append( canvas.element );
