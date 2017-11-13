.PHONY:	all build clean almostclean distclean

all:	clean build

build:
	npm run build

clean:
	rm -fr lib

almostclean:	clean

distclean:	almostclean
