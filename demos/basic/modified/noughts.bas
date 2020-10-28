' Noughts and Crosses v1.0
' Geoff Pack - 2 Jan 1997


    GOSUB initialiseGame
start:
    GOSUB setBoard
    GOSUB selectPlayers
    GOSUB playGame
    PRINT
    INPUT "Play Again "; G$
    IF G$ = "y" GOTO start
END

initialiseGame:
    pp = 1
    a(3, 3) = 0
    w = 0
    n = 0
    r(8) = 0
    x = 0
    y = 0
    wins1 = 0
    wins2 = 0
    draws = 0
    games = 0
RETURN

setBoard:
    ' draw grid
    SCREEN 12
    CLS
    LINE (250, 150)-(550, 150), 9
    LINE (250, 250)-(550, 250), 9
    LINE (350, 50)-(350, 350), 9
    LINE (450, 50)-(450, 350), 9

    ' initialise board array
    FOR j = 1 TO 3
    FOR i = 1 TO 3
        a(i, j) = 0
    NEXT i, j

    ' initialise row array
    FOR i = 1 TO 8
        r(i) = 0
    NEXT i
RETURN

selectPlayers:
    INPUT "Enter number of players: "; pp
    PRINT
    IF pp > 2 GOTO selectPlayers
    IF pp = 0 THEN
        S1$ = "Noughts"
        S2$ = "Crosses"
    ELSEIF pp = 1 THEN
        S1$ = "You"
        S2$ = "I"
    ELSEIF pp = 2 THEN
        S1$ = "Player 1"
        S2$ = "Player 2"
    END IF
RETURN


playGame:
    w = 0
    n = 0
    x = 0
    y = 0
   
    games = games + 1

500 n = n + 1
    v = 1
    IF pp = 0 THEN GOSUB randomPlayer
    IF (pp = 1 OR pp = 2) THEN GOSUB player1
    GOSUB testWin
    IF w > 0 GOTO 590
    n = n + 1
    v = 10
    IF pp = 0 THEN GOSUB randomPlayer
    IF pp = 1 THEN GOSUB computerPlayer
    IF pp = 2 THEN GOSUB player1
    GOSUB testWin
    IF w > 0 GOTO 590
    GOTO 500
590 RETURN

testWin:
    GOSUB testRows
    FOR i = 1 TO 8
        IF r(i) = 3 THEN w = 1
        IF r(i) = 30 THEN w = 2
    NEXT i
    IF (w = 0 AND n >= 9) THEN w = 3

    ' add to scores and print
    IF w = 1 THEN wins1 = wins1 + 1: PRINT S1$; " win !"
    IF w = 2 THEN wins2 = wins2 + 1: PRINT S2$; " win !"
    IF w = 3 THEN draws = draws + 1: PRINT "Draw"
    
    IF w > 0 THEN
        PRINT
        PRINT S1$; ":", wins1
        PRINT S2$; ":", wins2
        PRINT "Draws:", draws
        PRINT "Games:", games
    END IF

RETURN

testRows:
    r(1) = a(1, 1) + a(2, 1) + a(3, 1)
    r(2) = a(1, 2) + a(2, 2) + a(3, 2)
    r(3) = a(1, 3) + a(2, 3) + a(3, 3)
    r(4) = a(1, 1) + a(1, 2) + a(1, 3)
    r(5) = a(2, 1) + a(2, 2) + a(2, 3)
    r(6) = a(3, 1) + a(3, 2) + a(3, 3)
    r(7) = a(1, 1) + a(2, 2) + a(3, 3)
    r(8) = a(3, 1) + a(2, 2) + a(1, 3)
RETURN

plotO:
    CIRCLE (100 * x + 200, 100 * y), 30, 10
RETURN

plotX:
    LINE (100 * x + 170, 100 * y - 30)-(100 * x + 230, 100 * y + 30), 12
    LINE (100 * x + 230, 100 * y - 30)-(100 * x + 170, 100 * y + 30), 12
RETURN

player1:
1000 IF pp = 1 THEN INPUT "Your Move (1-9): "; p
    IF (pp = 2 AND v = 1) THEN INPUT "Player 1 (1-9): "; p
    IF (pp = 2 AND v = 10) THEN INPUT "Player 2 (1-9): "; p
   
    IF p = 1 THEN
        x = 1: y = 3
    ELSEIF p = 2 THEN x = 2: y = 3
    ELSEIF p = 3 THEN x = 3: y = 3
    ELSEIF p = 4 THEN x = 1: y = 2
    ELSEIF p = 5 THEN x = 2: y = 2
    ELSEIF p = 6 THEN x = 3: y = 2
    ELSEIF p = 7 THEN x = 1: y = 1
    ELSEIF p = 8 THEN x = 2: y = 1
    ELSEIF p = 9 THEN x = 3: y = 1
    ELSE PRINT "Illegal Move": GOTO 1000
    END IF

    IF a(x, y) > 0 THEN PRINT "Illegal Move": GOTO 1000
    a(x, y) = v
    IF v = 1 THEN GOSUB plotO
    IF v = 10 THEN GOSUB plotX
RETURN

randomPlayer:
    FOR t = 1 TO 10000: NEXT t
2000 RANDOMIZE TIMER
    i = INT(RND * 3) + 1
    j = INT(RND * 3) + 1
    IF a(i, j) > 0 THEN GOTO 2000
    x = i: y = j
    a(x, y) = v
    IF v = 1 THEN GOSUB plotO
    IF v = 10 THEN GOSUB plotX
    
RETURN

computerPlayer:
    FOR t = 1 TO 10000: NEXT t
        x = 0: y = 0
        IF v = 10 THEN v2 = 2
        IF v = 1 THEN v2 = 20

    IF n = 1 THEN
        ' first move response
        x = 1: y = 1
        GOTO 3900

    ELSEIF n = 2 THEN
        'second move response
        IF a(2, 2) > 0 THEN x = 1: y = 1
        IF a(2, 2) = 0 THEN x = 2: y = 2
        GOTO 3900

    ELSE
       
        'if 2 in any row then make 3 to win
        'if r(i)=2*v then add to row
            GOSUB testRows
               FOR j = 1 TO 3
                   IF r(j) = 2 * v THEN
                       IF a(1, j) = 0 THEN x = 1: y = j
                       IF a(2, j) = 0 THEN x = 2: y = j
                       IF a(3, j) = 0 THEN x = 3: y = j
                   END IF
               NEXT j

               FOR i = 1 TO 3
                   IF r(i + 3) = 2 * v THEN
                       IF a(i, 1) = 0 THEN x = i: y = 1
                       IF a(i, 2) = 0 THEN x = i: y = 2
                       IF a(i, 3) = 0 THEN x = i: y = 3
                   END IF
               NEXT i
               IF r(7) = 2 * v THEN
                   IF a(1, 1) = 0 THEN x = 1: y = 1
                   IF a(2, 2) = 0 THEN x = 2: y = 2
                   IF a(3, 3) = 0 THEN x = 3: y = 3
               END IF
               IF r(8) = 2 * v THEN
                   IF a(3, 1) = 0 THEN x = 3: y = 1
                   IF a(2, 2) = 0 THEN x = 2: y = 2
                   IF a(1, 3) = 0 THEN x = 1: y = 3
               END IF
            IF x <> 0 THEN GOTO 3900

        'else if 2 in any row then block
        'if r(i)=v2 then add to row
            GOSUB testRows
               FOR j = 1 TO 3
                   IF r(j) = v2 THEN
                       IF a(1, j) = 0 THEN x = 1: y = j
                       IF a(2, j) = 0 THEN x = 2: y = j
                       IF a(3, j) = 0 THEN x = 3: y = j
                   END IF
               NEXT j
               FOR i = 1 TO 3
                   IF r(i + 3) = v2 THEN
                       IF a(i, 1) = 0 THEN x = i: y = 1
                       IF a(i, 2) = 0 THEN x = i: y = 2
                       IF a(i, 3) = 0 THEN x = i: y = 3
                   END IF
               NEXT i

               IF r(7) = v2 THEN
                   IF a(1, 1) = 0 THEN x = 1: y = 1
                   IF a(2, 2) = 0 THEN x = 2: y = 2
                   IF a(3, 3) = 0 THEN x = 3: y = 3
               END IF
               IF r(8) = v2 THEN
                   IF a(3, 1) = 0 THEN x = 3: y = 1
                   IF a(2, 2) = 0 THEN x = 2: y = 2
                   IF a(1, 3) = 0 THEN x = 1: y = 3
               END IF
            IF x <> 0 THEN GOTO 3900

        'else if can make 2 in 2 rows do it
            'find an x,y such that r(i)=2v and r(j)=2v
            IF x <> 0 THEN GOTO 3900

        'else if can make 2 in row do it
            'if r(i)=v then add another to row
            IF x <> 0 THEN GOTO 3900

3800    'else random move
            RANDOMIZE 1
            i = INT(RND * 3) + 1
            j = INT(RND * 3) + 1
            IF a(i, j) > 0 THEN GOTO 3800
            x = i: y = j
            GOTO 3900

        'END IF
    END IF

3900 ' print and return
        a(x, y) = v
        IF v = 1 THEN GOSUB plotO
        IF v = 10 THEN GOSUB plotX
RETURN
