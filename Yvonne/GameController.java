import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
public class GameController implements ActionListener{
    private GamePanel gamePanel;
    private Timer timer;
    private int[][] board;
    private int score;
    private Piece currentP;
    private boolean movingLeft = false;
    private boolean movingRight = false;
    private boolean movingDown = false;

    public GameController(GamePanel gamePanel){
        this.gamePanel = gamePanel;
        this.score = 0;
        this.board = new int[19][10];
        timer = new Timer(300,this);
        newPiece();
        timer.start();
        gamePanel.setFocusable(true);
        gamePanel.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e){
                handleKeyPress(e);
            }
            @Override
            public void keyReleased(KeyEvent e){
                handleKeyRelease(e);
            }
        });
    }

    private void newPiece(){
        int iShape = (int) (Math.random()*7);
        int[][] shape = Tetromino.SHAPES[iShape];
        currentP = new Piece(shape,iShape);
    }

    @Override
    public void actionPerformed(ActionEvent e){
        moveD();
        if(movingLeft){
            moveL();
        }
        if(movingRight){
            moveR();
        }
        if(movingDown){
            moveD();
        }
        gamePanel.repaint();
    }
    
    private void moveD(){
        if(canMove(currentP.getX(),currentP.getY()+1)){
            currentP.moveDown();
        }
        else{
            placePieceOnBoard();
            clearLines();
            newPiece();
            if(!canMove(currentP.getX(),currentP.getY())){
                timer.stop();
                JOptionPane.showMessageDialog(gamePanel, "Game Over!");
            }
            gamePanel.repaint();
        }
    }

    private boolean canMove(int x, int y){
        int[][] shape = currentP.getShape();
        for(int row=0; row<shape.length;row++){
            for(int col=0;col<shape[row].length;col++){
                if(shape[row][col]==1){
                    int newX = x+col;
                    int newY = y+row;
                    if(newX<0){
                        return false;
                    }
                    if(newX>=board[0].length){
                        return false;
                    }
                    if(newY>=board.length||(newY<board.length&&board[newY][newX]==1)){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private void placePieceOnBoard(){
        int[][] shape = currentP.getShape();
        for(int row = 0;row<shape.length;row++){
            for(int col=0;col<shape[row].length;col++){
                if(shape[row][col]==1){
                    board[currentP.getY()+row][currentP.getX()+col]=1;
                }
            }
        }
        clearLines();
        gamePanel.repaint();
    }
    private void clearLines(){
        int linesC = 0;
        for(int row=0;row<board.length;row++){
            boolean fullLine = true;
            for(int col=0;col<board[row].length;col++){
                if(board[row][col]==0){
                    fullLine = false;
                    break;
                }
            }
            if(fullLine){
                clearLine(row);
                shiftLinesDown(row);
                linesC++;
            }
        }
        updateScore(linesC);
    }
    private void updateScore(int linesC) {
        if (linesC > 0) {
            score += (linesC*100);
        }
    }

    public int getScore(){
        return score;
    }

    private void clearLine(int row){
        for(int col=0;col<board[row].length;col++){
            board[row][col] = 0;
        }
    }

    private void shiftLinesDown(int cleared){
        for(int row = cleared-1;row>=0;row--){
            for(int col=0;col<board[row].length;col++){
                if(board[row][col]!=0){
                    board[row+1][col] = board[row][col];
                    board[row][col]=0;
                }
            }
        }
    }

    private void handleKeyPress(KeyEvent e){
        switch (e.getKeyCode()) {
            case KeyEvent.VK_LEFT:
                moveL();
                break;
            case KeyEvent.VK_RIGHT:
                moveR();
                break;
            case KeyEvent.VK_DOWN:
                moveD();
                break;
            case KeyEvent.VK_UP:
                rotatePiece();
                break;
            case KeyEvent.VK_SPACE:
                dropPiece();
                break;
        }
        gamePanel.repaint();
    }

    private void handleKeyRelease(KeyEvent e){
        switch(e.getKeyCode()){
            case KeyEvent.VK_LEFT:
                movingLeft=false;
                break;
            case KeyEvent.VK_RIGHT:
                movingRight = false;
                break;
            case KeyEvent.VK_DOWN:
                movingDown = false;
                break;
        }
    }

    private void moveL(){
        if(canMove(currentP.getX()-1, currentP.getY())){
            currentP.moveL();
        }
    }

    private void moveR(){
        if(canMove(currentP.getX()+1, currentP.getY())){
            currentP.moveR();
        }
    }

    private void dropPiece() {
        int dropY = currentP.getY();
        while (canMove(currentP.getX(), dropY + 1)) {
            dropY++;
        }
        currentP.setPosition(currentP.getX(), dropY);
        placePieceOnBoard();
    }

    private void rotatePiece(){
        int[][] originalShape = currentP.getShape();
        int originalX = currentP.getX();
        int originalY = currentP.getY();
        int rows = originalShape.length;
        int cols = originalShape[0].length;
        int[][] rotateShape = new int[cols][rows];
        for (int r=0;r<rows;r++){
            for(int c=0;c<cols;c++){
                rotateShape[c][rows-1-r] = originalShape[r][c];
            }
        }
        currentP = new Piece(rotateShape,currentP.getType());
        currentP.setPosition(originalX, originalY);
        if(!canMove(currentP.getX(), currentP.getY())){
            currentP = new Piece(originalShape,currentP.getType());
        }
        
    }
    public int[][] getBoard(){
        return board;
    }
    public Piece getCurrentP(){
        return currentP;
    }
}
