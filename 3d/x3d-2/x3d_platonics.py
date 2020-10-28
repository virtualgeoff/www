'''
Simple script to write out SVG to describe the Platonic solids.
'''

from rotfl.geometry import unit_tetrahedron, unit_cube, unit_octohedron, unit_dodecahedron, unit_icosahedron

colors = [(1,0,0),(1,.65, 0), (1, 1, 0), (0, 1, 0), (0, 0, 1)]
shapes = unit_tetrahedron, unit_cube, unit_octohedron, unit_dodecahedron, unit_icosahedron

platonics = zip(colors, shapes)

def fstr(floatnum):
    '''Float to string conversion, while minimizing string'''
    # convert float to string with 3 decimal points of precision
    fl_str = '%.3f' % floatnum
    # Truncate any zeros from string
    while fl_str.endswith('0'):
        fl_str = fl_str[:-1]
    # If no decimal part, just use an int representation
    if fl_str.endswith('.'):
        fl_str = fl_str[:-1]
    # otherwise, remove any leading zero
    elif fl_str.startswith('0.'):
        fl_str = fl_str[1:]
    return fl_str

def shape(color, points, faces):
    shape_template = '''<Shape>
    <Appearance>
        <Material diffuseColor="%s %s %s"/>
    </Appearance>
    <IndexedFaceSet coordIndex="%s">
        <Coordinate point="%s"/>
    </IndexedFaceSet>
</Shape>''' 
    r,g,b = color
    facelist= ',-1, '.join([','.join([str(x) for x in coords]) for coords in faces])
    coord_pts = ', '.join([' '.join([fstr(x) for x in pt]) for pt in points])
    return shape_template % (r,g,b,facelist, coord_pts)
    

def all_shapes():
    for color, shape_fn in platonics:
        points, edges, faces = shape_fn()
        yield shape(color, points, faces)


template = '''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D 3.0//EN"   "http://www.web3d.org/specifications/x3d-3.0.dtd">
<X3D profile='Immersive' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation=' http://www.web3d.org/specifications/x3d-3.0.xsd '>
    <head>
        <meta name='filename' content='platonics.x3d'/> 
        <meta name='author' content='Dethe Elza'/> 
        <meta name='created' content='2005-10-20'/> 
        <meta name='description' content='Display of the Platonic solids'/> 
    </head> 
    <Scene>
    <!-- This NavigationInfo node is added to many scenes, making examination of objects easier. --> 
        <NavigationInfo type='"EXAMINE" "ANY"'/> 
        <Viewpoint description='Default' position='0 0 7'/> 
        <Background skyColor="1 1 1" groundColor="1 1 1"/>
        <Transform translation="-2.5 0 0" scale=".5 .5 .5">
            %s
        </Transform>
        <Transform translation="-1.25 0 0" scale=".5 .5 .5">
            %s
        </Transform>
        <Transform translation="0 0 0" scale=".5 .5 .5">
        %s
        </Transform>
        <Transform translation="1.25 0 0" scale=".5 .5 .5">
            %s
        </Transform>
        <Transform translation="2.5 0 0" scale=".5 .5 .5">
            %s
        </Transform>
    </Scene>
</X3D>
'''

print template % tuple(all_shapes())
