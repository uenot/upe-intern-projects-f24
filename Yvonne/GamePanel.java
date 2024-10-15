
import java.awt.*;
import javax.swing.*;

public class GamePanel extends JPanel{
    private GameController controller;

    public GamePanel() {
        setBackground(Color.BLACK);
        setFocusable(true);
    }

    public void setController(GameController controller) {
        this.controller = controller;
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        drawBoard(g);
        drawPiece(g);
        g.setColor(Color.WHITE);
        g.setFont(new Font("Arial", Font.BOLD, 20));
        g.drawString("Score: " +controller.getScore(), 10, 30); 
    }

    private void drawBoard(Graphics g) {
        int[][] board = controller.getBoard();
        for (int row=0;row<board.length;row++){
            for(int col=0;col<board[row].length;col++){
                if(board[row][col]==1){
                    g.setColor(Color.GRAY);
                    g.fillRect(col*Constants.BOX_SIZE, row*Constants.BOX_SIZE, Constants.BOX_SIZE, Constants.BOX_SIZE);
                    g.setColor(Color.BLACK);
                    g.drawRect(col*Constants.BOX_SIZE, row*Constants.BOX_SIZE, Constants.BOX_SIZE, Constants.BOX_SIZE);
                }
            }
        }
    }
    
    private void drawPiece(Graphics g) {
        Piece currentP = controller.getCurrentP();
        int[][] shape = currentP.getShape();
        int x = currentP.getX()*Constants.BOX_SIZE;
        int y = currentP.getY()*Constants.BOX_SIZE;
        g.setColor(currentP.getColor());
        for (int row=0;row<shape.length;row++) {
            for (int col=0;col<shape[row].length;col++) {
                if(shape[row][col]==1){
                    g.fillRect(x+col*Constants.BOX_SIZE, y+row*Constants.BOX_SIZE, Constants.BOX_SIZE, Constants.BOX_SIZE);
                }
            }
        }
    }
}
