
verify('on click, highlight Lexeme.', function() {

    var lex = new Lexeme('foo').render();

    lex.click();

    assert.isTrue(
	lex.classList.contains( "relationForming" ) );
});
