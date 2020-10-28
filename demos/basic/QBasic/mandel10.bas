10  REM **** Rudimentary Mandelbrot Set Program v1.0 ****
20  REM **** by Geoff Pack. v1.0: 15 Nov 1996        ****
30  REM **** Created with MS-DOS QBasic Version 1.0  ****
40  REM **** Run initially on 286 monochrome laptop  ****
50  REM **** Reference: Gleik, 1987 p.227, 231-232.  ****

100 REM graphic mode 1: 320 x 200 pixels, 16 color
110 SCREEN 1

120 REM begin loops for x and y ; d is resolution (block size)
130 REM x,y are set coordinates; a,b are screen coordinates.
140 d = 2
150 dd = d - 1
160 REM screen size 320 x 200: 320-d keeps last block on screen.
170 FOR b = 0 TO 200 STEP d
180 FOR a = 0 TO (320 - d) STEP d

200 REM initialise iteration variables
210 REM origin of x and y at a=200, b=100
220 REM range of x: -0.625 to 0.375; range of y: -0.5 to 0.5
230 x0 = (a - 200) * .01
240 y0 = (100 - b) * .01
250 xn = x0
260 yn = y0
270 xnn = x0
280 ynn = y0
290 n = 0

300 REM iteration loop: test if point in Mandelbrot set.
310 xnn = xn * xn - yn * yn + x0
320 ynn = 2 * xn * yn + y0
330 xn = xnn
340 yn = ynn
350 n = n + 1
360 REM see Gleik p.232 re next test
370 IF (xn * xn > 4) OR (yn * yn > 4) OR (n > 100) THEN GOTO 400
380 GOTO 300

400 REM plot routine: color = c, dd = block size
410 REM if color monitor change line 370 to n>1000, and set different
420 REM colors for diferent n in line 430
430 IF (n > 100) THEN c = 1 ELSE c = 0
440 REM "BF" creates filled block, of color c.
450 LINE (a, b)-(a + dd, b + dd), c, BF

500 REM close loops for x and y
510 NEXT a
520 NEXT b

600 END

