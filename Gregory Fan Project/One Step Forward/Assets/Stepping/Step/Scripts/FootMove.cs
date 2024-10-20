using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FootMove : MonoBehaviour
{
  [SerializeField] AudioSource audioPlayer;
  [SerializeField] FootSoundHandler soundPicker;
   [SerializeField] GameObject otherFoot;
  [SerializeField] bool dragging = false;
  [SerializeField] float minY;
  [SerializeField] float maxYRange = 40;
  float maxY;
  [SerializeField] float maxXrange = 3;
  [SerializeField] bool ableToMove = true;
  

  float maxX;
  float minX;

  private Vector3 offset;

  private void Start() {
    minY = transform.position.y;
    maxY = transform.position.y + maxYRange;
    minX = transform.position.x - maxXrange;
    maxX = transform.position.x + maxXrange;
  }

  // Update is called once per frame
  void Update() {
    UpdateCanMove();
    if (dragging) {
      // Move object, taking into account original offset.
      Vector2 newPos = Camera.main.ScreenToWorldPoint(Input.mousePosition) + offset;
      newPos.y = Mathf.Clamp(newPos.y, minY, maxY); 
      newPos.x = Mathf.Clamp(newPos.x, minX, maxX);
      transform.position = newPos;
    }
  }

  private void OnMouseDown() {
    if(!ableToMove) return;

    // Record the difference between the objects centre, and the clicked point on the camera plane.
    offset = transform.position - Camera.main.ScreenToWorldPoint(Input.mousePosition);
    maxY = otherFoot.transform.position.y + maxYRange;
    dragging = true;
  }

  private void OnMouseUp() {
    // Stop dragging.
    if(dragging){
       PlayStepSound();
    }
    dragging = false;
    minY = transform.position.y;

   
  }

  void UpdateCanMove(){
    if(otherFoot.transform.position.y + 2 < transform.position.y){
      ableToMove = false;
    }else{
      ableToMove = true;
    }
  }

  void PlayStepSound(){
    AudioClip clipToPlay = soundPicker.giveAudioClip();
    audioPlayer.clip = clipToPlay;
    audioPlayer.Play();
  }
  
}
