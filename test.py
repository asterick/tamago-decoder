import os, struct

mx, mn = [0] * 8, [0xFF] * 8

alldata = {}

for r, _, f in os.walk("."):
	for fn in f:
		if fn[-4:] != '.jpg':
			continue

		data = file(os.path.join(r,fn), u"rb").read()
		idx = data.find("TAMAGO")
		header = data[idx:idx+0xFE]
		
		serial, = struct.unpack(">H", header[0x5A:0x5C])
		unknown = ["%2x" % i for i in struct.unpack(">8B", header[0x52:0x5a])]


		unknown = tuple(unknown)
		if not unknown in alldata:
			alldata[unknown] = []

		alldata[unknown] += [(serial, unknown, r+"/"+fn, len(data) - idx)]


s = alldata.keys()
s.sort()
for k in s:
	for serial, unknown, fn, length in alldata[k]:
		print "%4x - %5i - %4x - %s -" % (length, serial, serial, ' '.join(unknown)), fn

