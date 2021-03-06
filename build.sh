#!/bin/bash

bundlefile='app/app.js'
bundle_head='bundle_head.js'
bundle_main='bundle_main.js'
bundle_tail='bundle_tail.js'

scripts=$(cat './manifest.txt')
cat $scripts > "$bundle_main"

echo '(function(){ ' > "$bundle_head"
echo '}());' > "$bundle_tail"
cat "$bundle_head" "$bundle_main" "$bundle_tail" > "$bundlefile"

rm -f "$bundle_head" "$bundle_main" "$bundle_tail"

this_commit=$(git log -n 1 --format=%H)
build_hash_pattern='||build_hash||'

tmp_page='app/tmp.html'
rm -f $tmp_page

template_page='src/reader_template.html'
output_page='app/reader.html'

sed -e "s/$build_hash_pattern/$this_commit/g" $template_page > $tmp_page

cp $tmp_page $output_page
rm $tmp_page
