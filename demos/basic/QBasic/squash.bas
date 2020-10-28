'       Squash Program
'       Geoff Pack
'       18 Nov 1996

score = 0
py = 50

FOR ball = 1 TO 3 STEP 1
    k = 1
    GOSUB screeninit
    GOSUB ballinit

    DO WHILE k = 1
        GOSUB delay
        GOSUB movepaddle
        GOSUB moveball
    LOOP
100 GOSUB pause
NEXT ball
END


screeninit:
        CLS
        SCREEN 1
        LINE (1, 10)-(320, 12), 1, BF
        LINE (317, 12)-(320, 198), 1, BF
        LINE (1, 198!)-(320, 200), 1, BF
RETURN

ballinit:
        x = 100: y = 50
        vx = 3: vy = 2
RETURN

moveball:
        x1 = x + vx: y1 = y + vy
        IF x1 < 6 THEN GOSUB hitpaddle
        IF x1 > 314 THEN x1 = 314: vx = -vx
        IF y1 < 15 THEN y1 = 15: vy = -vy
        IF y1 > 195 THEN y1 = 195: vy = -vy
        LINE (x - 2, y - 2)-(x + 2, y + 2), 0, BF
        LINE (x1 - 2, y1 - 2)-(x1 + 2, y1 + 2), 1, BF
        x = x1: y = y1
        IF (ballmissed = 1) THEN ballinplay = 0
RETURN

hitpaddle:
        x1 = 6
        IF ABS(py - y) <= 12 THEN
                vx = -vx
        ELSEIF ABS(py - y) <= 16 THEN xv = -vx: vy = -vy
        ELSEIF ABS(py - y) <= 20 THEN vx = -vx: vy = -1.5 * vy
        ELSE x1 = 3: GOTO 100
        END IF
RETURN


movepaddle:
		' keyboard input - need mouse input
        kbd$ = INKEY$
        IF kbd$ = "," THEN pdy = 2
        IF kbd$ = "." THEN pdy = -2
        IF kbd$ = " " THEN pdy = 0
        LINE (1, py - 20)-(3, py + 20), 0, BF
        py = py + pdy
        IF py > 175 THEN py = 175: pdy = 0
        IF py < 35 THEN py = 35: pdy = 0
        LINE (1, py - 20)-(3, py + 20), 1, BF
RETURN

delay:
		' controls speed of game
        FOR i = 1 TO 1200
        NEXT i
RETURN

pause:
		' pause between balls
        FOR i = 1 TO 10000
        NEXT i
RETURN

