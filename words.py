alphabet = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 'š', 'z', 'ž', 't', 'u', 'v', 'õ', 'ä', 'ö', 'ü']
f = open('lemmad2013.txt')
lines = [l.strip() for l in f.readlines() if len(l.strip()) == 5]

fw = open('words.txt', 'w')
for w in lines:
    has_allowed_letters = True
    for c in w:
        if not c in alphabet:
            has_allowed_letters = False
    if has_allowed_letters:
        fw.write(w + '\n')