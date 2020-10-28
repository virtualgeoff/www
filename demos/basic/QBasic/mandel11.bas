10  REM **** Rudimentary Mandelbrot Set Program v1.1 ****
20  REM **** by Geoff Pack. v1.0: 16 Nov 1996        ****
30  REM **** Created with MS-DOS QBasic Version 1.0  ****
40  REM **** v1.0 run initially on a monochrome 286  ****
50  REM **** v1.1 modified for VGA Pentium           ****
60  REM **** Reference: Gleik, 1987 p.227, 231-232.  ****

70  REM ** v1.1: Time = 1:07 (min:sec) for d=10 on pentium 120  **

100 REM graphic mode 12: 640 x 480 pixels, 16 color
110 SCREEN 12

120 REM begin loops for x and y ; d is resolution (block size)
130 REM x,y are set coordinates; a,b are screen coordinates.
140 d = 10
150 dd = d - 1
160 REM screen size 640 x 480: 640-d keeps last block on screen.
170 FOR b = 0 TO 480 STEP d
180 FOR a = 0 TO (640 - d) STEP d

200 REM initialise iteration variables
210 REM origin of x and y at a=480, b=240
220 REM range of x: -2.4 to +0.8
225 REM range of y: -1.2 to +1.2
230 x0 = (a - 480) / 200
240 y0 = (240 - b) / 200
250 xn = x0
260 yn = y0
270 xnn = x0
280 ynn = y0
290 n = 0

300 REM iteration loop: test if point in Mandelbrot set.
310 REM see Gleik p.232 re test
320 xnn = xn * xn - yn * yn + x0
330 ynn = 2 * xn * yn + y0
340 xn = xnn
350 yn = ynn
360 n = n + 1
370 IF (xn * xn > 4) OR (yn * yn > 4) OR (n > 1000) THEN GOTO 400
380 GOTO 300

400 REM plot routine: color = c, dd = block size
430 c = 5
435 IF (n > 5) THEN c = 13
440 IF (n > 10) THEN c = 12
445 IF (n > 20) THEN c = 6
450 IF (n > 50) THEN c = 14
455 IF (n > 100) THEN c = 10
460 IF (n > 200) THEN c = 3
465 IF (n > 400) THEN c = 9
466 IF (n > 800) THEN c = 1
470 IF (n > 1000) THEN c = 0
480 REM "BF" creates filled block, of color c.
490 LINE (a, b)-(a + dd, b + dd), c, BF

500 REM close loops for x and y
510 NEXT a
520 NEXT b

600 END

