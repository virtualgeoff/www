import java.applet.*;import java.awt.*;public class ImageTest extends java.applet.Applet {	Image testImg;		public void init() {		testImg = getImage(getCodeBase(),"images/lander_on.gif");	}	public void paint(Graphics g) {		setBackground(Color.black);		g.drawImage(testImg,0,0,this);	}}