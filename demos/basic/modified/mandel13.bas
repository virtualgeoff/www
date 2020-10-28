' Rudimentary Mandelbrot Set Program v1.3
' by Geoff Pack. v1.0: 19 Nov 1996 
' Reference: Gleick, 1987 p.227, 231-232. 

' Created with MS-DOS QBasic Version 1.0
' v1.0 run initially on a monochrome 286
' v1.1 onwards modified for VGA Pentium
' v1.2 faster main iteration loop
' v1.3 procedure based - slower

' For a maximum of 1000 iterations for each point:
' v1.1: Time = 1:07.5 (min:sec) for d=10 on pentium 120
' v1.2: Time = 0:59.7 (min:sec) for d=10 on pentium 120

' For a maximum of 256 iterations for each point:  
' v1.2: Time = 0:17.5 (min:sec) for d=10 on pentium 120
' v1.2: Time = 1:08.2 (min:sec) for d=5  on pentium 120
' v1.2: Time = 27:52  (min:sec) for d=1  on pentium 120

again = 1

DO UNTIL again = 0
    GOSUB InitialiseScreen
    GOSUB InputInfo
    FOR b = bmin TO (bmax - res) STEP res
        FOR a = amin TO (amax - res) STEP res
            GOSUB ConvertXY
            GOSUB MandelbrotSetTest
            GOSUB PlotPoint
            GOSUB PrintInfo
        NEXT a
    NEXT b
LOOP

500 END

InitialiseScreen:
        ' graphic mode 12: 640 x 480 pixels, 16 color
        ' leave top 40 pixels for input and data display
        ' round horiz down to 600 pixels for 3:2 ratio
        SCREEN 12
        amax = 600: amin = 0
        bmax = 440: bmin = 40
        ra = amax - amin
        rb = bmax - bmin
        res = 1
RETURN

InputInfo:
        ' window input:input xmin, xmax, ymin, ymax, resolution
        LOCATE 1, 1: PRINT "                    "
        LOCATE 1, 1: INPUT "resolution "; s1$
        res = VAL(s1$)
        IF res <= 0 THEN GOTO 500

        LOCATE 1, 21: PRINT "                    "
        LOCATE 1, 21: INPUT "centre "; s2$, s3$
        LOCATE 1, 45: PRINT "                    "
        LOCATE 1, 45: INPUT "width "; s4$
        xc = VAL(s2$)
        yc = VAL(s3$)
        rx = VAL(s4$)
        res1 = res - 1
        ry = rx * rb / ra
        xmin = xc - rx / 2: xmax = xc + rx / 2
        ymin = yc - ry / 2: ymax = yc + ry / 2
        LOCATE 1, 61: PRINT "                    "
        LOCATE 1, 61: PRINT "height: "; ry
        i = 0
RETURN

ConvertXY:
        ' convert a,b to x,y and initialise iteration variables
        ' center: xc,yc; range of x: rx; range of y: ry
        x0 = (rx / ra) * (a - amin) + xmin
        y0 = (-ry / rb) * (b - bmax) + ymin
RETURN

MandelbrotSetTest:
        ' iteration loop: test if point in Mandelbrot set.
        ' see Gleick p.232 re test
        ' can avoid saving old and new values by careful ordering
        ' of calculation: new xn does not require old xn, yn
        ' # are double precision numbers - overflows if not used
        xn = x0: yn = y0
        xn2# = 0: yn2# = 0
        n = 0
        zn2# = 0
       
        DO UNTIL ((n >= 512) OR (zn2# >= 8))
            n = n + 1
            i = i + 1
            xn2# = xn * xn
            yn2# = yn * yn
            zn2# = xn2# + yn2#
            yn = 2 * xn * yn + y0
            xn = xn2# - yn2# + x0
        LOOP
RETURN

PlotPoint:
        'plot routine: color = c, res1 = block size
        ' "BF" creates filled block, of color c.
        IF (n >= 512) THEN
                c = 0
        ELSEIF (n > 256) THEN c = 15
        ELSEIF (n > 128) THEN c = 7
        ELSEIF (n > 64) THEN c = 11
        ELSEIF (n > 32) THEN c = 10
        ELSEIF (n > 16) THEN c = 14
        ELSEIF (n > 8) THEN c = 12
        ELSEIF (n > 4) THEN c = 4
        ELSEIF (n > 2) THEN c = 5
        ELSE c = 1
        END IF
        LINE (a, b)-(a + res1, b + res1), c, BF
RETURN

PrintInfo:
		'overprints previous info
        LOCATE 2, 5: PRINT "                "
        LOCATE 2, 25: PRINT "                "
        LOCATE 2, 49: PRINT "                "
        LOCATE 2, 65: PRINT "                "
        LOCATE 2, 1: PRINT "x = "; x0
        LOCATE 2, 21: PRINT "y = "; y0
        LOCATE 2, 45: PRINT "n = "; n
        LOCATE 2, 61: PRINT "i = "; i
RETURN


