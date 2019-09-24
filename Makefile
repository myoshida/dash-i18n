.PHONY:	all build clean almostclean distclean

all:	clean build

build:
	yarn run build

test:
	yarn run test

clean:
	rm -fr lib

almostclean:	clean

distclean:	almostclean
