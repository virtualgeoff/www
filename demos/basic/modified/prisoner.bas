
' Prisoner's Dilemma
' original program by Alun L.Lloyd
' ref Scientific American, June 1995. pp80-83
' this adaption by Geoff Pack. 20 Nov 96

' s,=strategy, sn=new startegy, bc=boundary conditions
DEFINT C, I-N, S
DEFSNG B, H, P
DIM s(120, 120), sn(120, 120)
DIM bc(121), c(2, 2)
DIM payoff(120, 120)

' b=advantage of cheating, N=size of board, p=proportion of cheaters
LET b = 1.85
LET N = 120
LET p = .1

' payoff matrix        
LET pm(1, 1) = 1
LET pm(1, 2) = 0
LET pm(2, 1) = b
LET pm(2, 2) = 0

' colors of strategies 
LET c(1, 1) = 1
LET c(1, 2) = 2
LET c(2, 1) = 14
LET c(2, 2) = 4

' initialise board - defectors set randomly
RANDOMIZE TIMER
FOR i = 1 TO N
    FOR j = 1 TO N
        LET s(i, j) = 1
        IF (RND < p) THEN LET s(i, j) = 2
NEXT j, i

' set up boundary conditions, redirect edges
FOR i = 1 TO N
    LET bc(i) = i
NEXT i
LET bc(0) = N
LET bc(N + 1) = 1

' begin game
SCREEN 12

' number of rounds 
FOR M = 1 TO 1000

' calculate payoff for each player on grid        
    FOR i = 1 TO N
        FOR j = 1 TO N
            LET pa = 0
            FOR k = -1 TO 1
                FOR l = -1 TO 1
                    LET pa = pa + pm(s(i, j), s(bc(i + k), bc(j + l)))
            NEXT l, k
            LET payoff(i, j) = pa
    NEXT j, i

' find largest payoff in each neighbourhood and calculate new strategies
    FOR i = 1 TO N
        FOR j = 1 TO N
        LET hp = payoff(i, j)
        LET sn(i, j) = s(i, j)
            FOR k = -1 TO 1
                FOR l = -1 TO 1
                    IF payoff(bc(i + k), bc(j + l)) > hp THEN
                        LET hp = payoff(bc(i + k), bc(j + l))
                        LET sn(i, j) = s(bc(i + k), bc(j + l))
                    END IF
            NEXT l, k
    NEXT j, i

' display stategies
    FOR i = 1 TO N
        FOR j = 1 TO N
            c = (c(sn(i, j), s(i, j)))
            COLOR c
'           PSET (i, j) :' point - replace with 6x6 block for larger image
            res = 3
            LINE (res * i, res * j)-(res * i + res - 1, res * j + res - 1), c, BF
            LET s(i, j) = sn(i, j)
    NEXT j, i

NEXT M
END

