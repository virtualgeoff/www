' **** Rudimentary Mandelbrot Set Program v1.2 ****
' **** by Geoff Pack. v1.0: 17 Nov 1996        ****
' **** Created with MS-DOS QBasic Version 1.0  ****
' **** v1.0 run initially on a monochrome 286  ****
' **** v1.1 onwards modified for VGA Pentium   ****
' **** v1.2 : faster main iteration loop       ****
' **** Reference: Gleick, 1987 p.227, 231-232.  ****

' ** For a maximum of 1000 iterations for each point:      **
' ** v1.1: Time = 1:07.5 (min:sec) for d=10 on pentium 120 **
' ** v1.2: Time = 0:59.7 (min:sec) for d=10 on pentium 120 **

' ** For a maximum of 256 iterations for each point:       **
' ** v1.2: Time = 0:17.5 (min:sec) for d=10 on pentium 120 **
' ** v1.2: Time = 1:08.2 (min:sec) for d=5  on pentium 120 **
' ** v1.2: Time = 27:52  (min:sec) for d=1  on pentium 120 **

' graphic mode 12: 640 x 480 pixels, 16 color
' leave top 40 pixels for input and data display
' round horiz down to 600 pixels for 3:2 ratio
   
10  SCREEN 12
    amin = 0: amax = 600
    bmin = 40: bmax = 440
    ra = amax - amin
    rb = bmax - bmin

' window variables input: xmin, xmax, ymin, ymax, resolution
' program loops until null reslotion entered.

100 LOCATE 1, 61: PRINT "                    "
    LOCATE 1, 1: PRINT "                    "
    LOCATE 1, 1: INPUT "resolution "; s1$
    res = VAL(s1$)
    IF res < 1 THEN GOTO 700
    res1 = res - 1
   
    LOCATE 1, 21: PRINT "                    "
    LOCATE 1, 21: INPUT "centre "; s2$, s3$
    LOCATE 1, 41: PRINT "                    "
    LOCATE 1, 41: INPUT "width "; s4$
    xc = VAL(s2$)
    yc = VAL(s3$)
    rx = VAL(s4$)
    ry = rx * rb / ra
    xmin = xc - rx / 2
    xmax = xc + rx / 2
    ymin = yc - ry / 2
    ymax = yc + ry / 2
    LOCATE 1, 61: PRINT "height: "; ry
    i = 0

' begin loops for screen coordinates( a,b. res is (block size)
' screen size amax by bmax: max-res keeps last block on screen.
   
    FOR b = bmin TO (bmax - res) STEP res
    FOR a = amin TO (amax - res) STEP res

' convert a,b to x,y and initialise variables for test loop

200 x0 = (rx / ra) * (a - amin) + xmin
    y0 = (-ry / rb) * (b - bmax) + ymin
    xn = x0
    yn = y0
    xn2 = 0
    yn2 = 0
    n = 0
    zn = 0

' iteration loop: test if point in Mandelbrot set. c.f.Gleick p.232
' can avoid saving old and new values by ordering of calculation

300 n = n + 1
    i = i + 1
    IF (n >= 512) THEN GOTO 400
    xn2 = xn * xn
    yn2 = yn * yn
    zn = xn2 + yn2
    IF (zn >= 8) THEN GOTO 400
    yn = 2 * xn * yn + y0
    xn = xn2 - yn2 + x0
    GOTO 300

' plot routine: color = c, res = block size, "BF" for filled block

400 c = 1
    IF (n > 2) THEN c = 5
    IF (n > 4) THEN c = 4
    IF (n > 8) THEN c = 12
    IF (n > 16) THEN c = 14
    IF (n > 32) THEN c = 10
    IF (n > 64) THEN c = 11
    IF (n > 128) THEN c = 7
    IF (n > 256) THEN c = 15
    IF (n >= 512) THEN c = 0
    LINE (a, b)-(a + res1, b + res1), c, BF

' print variables

500 LOCATE 2, 5: PRINT "                "
    LOCATE 2, 25: PRINT "                "
    LOCATE 2, 45: PRINT "                "
    LOCATE 2, 65: PRINT "                "

    LOCATE 2, 1: PRINT "x = "; x0
    LOCATE 2, 21: PRINT "y = "; y0
    LOCATE 2, 41: PRINT "n = "; n
    LOCATE 2, 61: PRINT "i = "; i

' close loops for a, b

600 NEXT a
    NEXT b
    GOTO 10

700 END

