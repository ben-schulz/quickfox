PWD = `pwd`
TESTPAGE = "$(PWD)/test/results.html"
BROWSE = firefox -new-tab

SRC_FILES = src/* test/*

ENTR = entr
ENTR_FLAGS = -c
NEED_ENTR = "'make watch' requires entr to be installed."

watch:

	which $(ENTR) || ( echo $(NEED_ENTR) && exit 1 )
	ls $(SRC_FILES) | $(ENTR) $(ENTR_FLAGS) $(BROWSE) $(TESTPAGE)

test:
	$(BROWSE) $(TESTPAGE)

.PHONY: watch test
