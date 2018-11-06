
verify('successes are silent.', function() {

    assert.isTrue(true, 'nothing more.');
});

verify('it works.', function() {

    assert.isTrue(false, 'failures are visible.');
});
