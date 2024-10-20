import java.awt.Color;
public class Piece {
    private int[][] shape;
    private int x;
    private int y;
    private int type;
    public Piece(int[][] shape, int type){
        this.shape = shape;
        this.x = 3;
        this.y = 0;
        this.type = type;
    }
    public int[][] getShape(){
        return shape;
    }
    public int getX(){
        return x;
    }
    public int getY(){
        return y;
    }
    public int getType(){
        return type;
    }
    public void moveDown(){
        y++;
    }
    public void moveL(){
        x--;
    }
    public void moveR(){
        x++;
    }
    public void setPosition(int x, int y) {
        this.x = x;
        this.y = y;
    }
    public Color getColor(){
        return Constants.COLORS[type];
    }
}
