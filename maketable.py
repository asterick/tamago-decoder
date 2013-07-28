table = """0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	nop
0	0	0	0	0	0	0	0	0	1	0	0	0	0	0	0	slp
0	0	0	0	0	0	0	0	1	0	0	0	0	0	0	0	halt
0	0	0	0	0	0	1	0	0	0	0	0	rs				pushn %rs
0	0	0	0	0	0	1	0	0	1	0	0	rd				popn %rd
0	0	0	0	0	0	1	0	1	1	0	0	rb				jpr %rb
0	0	0	0	0	0	1	1	1	1	0	0	rb				jpr.d %rb
0	0	0	0	0	1	0	0	0	0	0	0	0	0	0	0	brk
0	0	0	0	0	1	0	0	0	1	0	0	0	0	0	0	retd
0	0	0	0	0	1	0	0	1	0	0	0	0	0	imm2		int imm2
0	0	0	0	0	1	0	0	1	1	0	0	0	0	0	0	reti
0	0	0	0	0	1	1	0	0	0	0	0	rb				call %rb
0	0	0	0	0	1	1	0	0	1	0	0	0	0	0	0	ret
0	0	0	0	0	1	1	0	1	0	0	0	rb				jp %rb
0	0	0	0	0	1	1	1	0	0	0	0	rb				call.d %rb
0	0	0	0	0	1	1	1	0	1	0	0	0	0	0	0	ret.d
0	0	0	0	0	1	1	1	1	0	0	0	rb				jp.d
0	0	0	0	0	0	0	0	0	0	0	1	rs				push %rs
0	0	0	0	0	0	0	0	0	1	0	1	rd				pop %rd
0	0	0	0	0	0	0	0	1	0	0	1	ss				pushs %ss
0	0	0	0	0	0	0	0	1	1	0	1	sd				pops %sd
0	0	0	0	0	0	0	1	1	1	0	1	0	0	0	0	ld.cf
0	0	0	0	1	0	0	0	sign8								jrgt sign8
0	0	0	0	1	0	0	1	sign8								jrgt.d sign8
0	0	0	0	1	0	1	0	sign8								jrge sign8
0	0	0	0	1	0	1	1	sign8								jrge.d sign8
0	0	0	0	1	1	0	0	sign8								jrlt sign8
0	0	0	0	1	1	0	1	sign8								jrlt.d sign8
0	0	0	0	1	1	1	0	sign8								jrle sign8
0	0	0	0	1	1	1	1	sign8								jrle.d sign8
0	0	0	1	0	0	0	0	sign8								jrugt sign8
0	0	0	1	0	0	0	1	sign8								jrugt.d sign8
0	0	0	1	0	0	1	0	sign8								jruge sign8
0	0	0	1	0	0	1	1	sign8								jruge.d sign8
0	0	0	1	0	1	0	0	sign8								jrult sign8
0	0	0	1	0	1	0	1	sign8								jrult.d sign8
0	0	0	1	0	1	1	0	sign8								jrule sign8
0	0	0	1	0	1	1	1	sign8								jrule.d sign8
0	0	0	1	1	0	0	0	sign8								jreq sign8
0	0	0	1	1	0	0	1	sign8								jreq.d sign8
0	0	0	1	1	0	1	0	sign8								jrne sign8
0	0	0	1	1	0	1	1	sign8								jrne.d sign8
0	0	0	1	1	1	0	0	sign8								call sign8
0	0	0	1	1	1	0	1	sign8								call.d sign8
0	0	0	1	1	1	1	0	sign8								jp sign8
0	0	0	1	1	1	1	1	sign8								jp.d sign8
0	0	1	0	0	0	0	0	rb				rd				ld.b %rd, [%rb]
0	0	1	0	0	0	0	1	rb				rd				ld.b %rd, [%rb]+
0	0	1	0	0	0	1	0	rs				rd				add %rd, %rs
0	0	1	0	0	0	1	1	imm5				rd				srl %rd, imm5
0	0	1	0	0	1	0	0	rb				rd				ld.ub %rd, [%rb]
0	0	1	0	0	1	0	1	rb				rd				ld.ub %rd, [%rb]+
0	0	1	0	0	1	1	0	rs				rd				sub %rd, %rs
0	0	1	0	0	1	1	1	imm5				rd				ssl %rd, imm5
0	0	1	0	1	0	0	0	rb				rd				ld.h %rd, [%rb]
0	0	1	0	1	0	0	1	rb				rd				ld.h %rd, [%rb]+
0	0	1	0	1	0	1	0	rs				rd				cmp %rd, %rs
0	0	1	0	1	0	1	1	imm5				rd				sra %rd, imm5
0	0	1	0	1	1	0	0	rb				rd				ld.uh %rd, [%rb]
0	0	1	0	1	1	0	1	rb				rd				ld.uh %rd, [%rb]+
0	0	1	0	1	1	1	0	rs				rd				ld.w %rd, %rs
0	0	1	0	1	1	1	1	imm5				rd				sla %rd, imm5
0	0	1	1	0	0	0	0	rb				rd				ld.w %rd, [%rb]
0	0	1	1	0	0	0	1	rb				rd				ld.w %rd, [%rb]+
0	0	1	1	0	0	1	0	rs				rd				and %rd, %rs
0	0	1	1	0	0	1	1	imm5				rd				rr %rd, imm5
0	0	1	1	0	1	0	0	rb				rd				ld.b [%rb], %rs
0	0	1	1	0	1	0	1	rb				rd				ld.b [%rb]+, %rs
0	0	1	1	0	1	1	0	rs				rd				or %rd, %rs
0	0	1	1	0	1	1	1	imm5				rd				rl %rd, imm5
0	0	1	1	1	0	0	0	rb				rs				ld.h [%rb], %rs
0	0	1	1	1	0	0	1	rb				rs				ld.h [%rb]+, %rs
0	0	1	1	1	0	1	0	rs				rd				xor %rd, %rs
0	0	1	1	1	1	0	0	rb				rs				ld.w [%rb], %rs
0	0	1	1	1	1	0	1	rb				rs				ld.w [%rb]+, %rs
0	0	1	1	1	1	1	0	rs				rd				not %rd, %rs
0	1	0	0	0	0	imm6						rd				ld.b %rd, [%sp+imm6]
0	1	0	0	0	1	imm6						rd				ld.ub %rd, [%sp+imm6]
0	1	0	0	1	0	imm6						rd				ld.h %rd, [%sp+imm6]
0	1	0	0	1	1	imm6						rd				ld.uh %rd, [%sp+imm6]
0	1	0	1	0	0	imm6						rd				ld.w %rd, [%sp+imm6]
0	1	0	1	0	1	imm6						rs				ld.b [%sp+imm6], %rs
0	1	0	1	1	0	imm6						rs				ld.h [%sp+imm6], %rs
0	1	0	1	1	1	imm6						rs				ld.w [%sp+imm6], %rs
0	1	1	0	0	0	imm6						rd				add %rd, imm6
0	1	1	0	0	1	imm6						rd				sub %rd, imm6
0	1	1	0	1	0	sign6						rd				cmp %rd, sign6
0	1	1	0	1	1	sign6						rd				ld.w %rd, sign6
0	1	1	1	0	0	sign6						rd				and %rd, sign6
0	1	1	1	0	1	sign6						rd				or %rd, sign6
0	1	1	1	1	0	sign6						rd				xor %rd, sign6
0	1	1	1	1	1	sign6						rd				not %rd, sign6
1	0	0	0	0	0	imm10										add %sp, imm10
1	0	0	0	0	1	imm10										sub %sp, imm10
1	0	0	0	1	0	0	0	imm5				rd				srl %rd, imm5
1	0	0	0	1	0	0	1	rs				rd				srl %rd, %rs
1	0	0	0	1	1	0	0	imm5				rd				sll %rd, imm5
1	0	0	0	1	1	0	1	rs				rd				sll %rd, %rs
1	0	0	1	0	0	0	0	imm5				rd				sra %rd, imm5
1	0	0	1	0	0	0	1	rs				rd				sra %rd, %rs
1	0	0	1	0	0	1	0	rs				rd				swap %rd, %rs
1	0	0	1	0	1	0	0	imm5				rd				sla %rd, imm5
1	0	0	1	0	1	0	1	rs				rd				sla %rd, %rs
1	0	0	1	1	0	0	0	imm5				rd				rr %rd, imm5
1	0	0	1	1	0	0	1	rs				rd				rr %rd, %rs
1	0	0	1	1	0	1	0	rs				rd				swaph %rd, %rs
1	0	0	1	1	1	0	0	imm5				rd				rl %rd, imm5
1	0	0	1	1	1	0	1	rs				rd				rl %rd, %rs
1	0	1	0	0	0	0	0	rs				sd				ld.w %sd, %rs
1	0	1	0	0	0	0	1	rs				rd				ld.b %rd, %rs
1	0	1	0	0	0	1	0	rs				rd				mul.h %rd, %rs
1	0	1	0	0	1	0	0	ss				rd				ld.w %rd, %ss
1	0	1	0	0	1	0	1	rs				rd				ld.ub %rd, %rs
1	0	1	0	0	1	1	0	rs				rd				mtu.h %rd, %rs
1	0	1	0	1	0	0	0	rb				0	imm3			btst [%rb], imm3
1	0	1	0	1	0	0	1	rs				rd				ld.h %rd, %rs
1	0	1	0	1	0	1	0	rs				rd				mlt.w %rd, %rs
1	0	1	0	1	1	0	0	rb				0	imm3			bclr [%rb], imm3
1	0	1	0	1	1	0	1	rs				rd				ld.uh %rd, %rs
1	0	1	0	1	1	1	0	rs				rd				mltu.w %rd, %rs
1	0	1	1	0	0	0	0	rb				0	imm3			bset [%rb], imm3
1	0	1	1	0	0	0	1	imm4				rd				ld.c%rs, imm4
1	0	1	1	0	1	0	0	rb				0	imm3			bnot [%rb], imm3
1	0	1	1	0	1	0	1	imm4				rs				ld.c imm4, %rs
1	0	1	1	1	0	0	0	rs				rd				adc %rd, %rs
1	0	1	1	1	1	0	0	rs				rd				sbc %rd, %rs
1	0	1	1	1	1	1	1	0	0	imm6						do.c imm6
1	0	1	1	1	1	1	1	0	1	0	imm5					psrset imm5
1	0	1	1	1	1	1	1	1	0	0	imm5					psrclr imm5
1	1	0	imm13													ext imm13"""

def operations():
    for line in table.splitlines():
        lock, mask = 0, 0

        fields = line.split("\t")
        bits,code = fields[0:16], fields[16]

        last, start = None, None

        fields = []

        def addField(name, start, end, fields):
            if name == None:
                return

            length = end - start
            start = 16 - end

            fields += [{
                "name": name, 
                "start": start, 
                "length": length
                }]

        for index, bit in enumerate(bits):
            if bit in ["0", "1"]:
                mask |= 1 << (15-index)
                if bit == "1":
                    lock |= 1 << (15-index)
                pass
            elif bit:
                addField(last, start, index, fields)
                last = bit
                start = index
            else:
                pass
        
        addField(last, start, 16, fields)

        yield { "code": code, "fields": fields, "mask": mask, "locked": lock }

import json
table = json.dumps([o for o in operations()])
file("s1c33.json","w").write(table)