using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AmbientMusicPlayer : MonoBehaviour
{
    [SerializeField] List<AudioClip> usedSongs;
    public bool forceStopped = false;
    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(songRoutine());
        //Runs A Timer.
        //Picks A Song
        //Plays that song and delays the next song by duration + offset.
    }

    IEnumerator songRoutine(){
        while(!forceStopped){
            float offset = Random.Range(20.0f, 60.0f);
            yield return new WaitForSeconds(offset);
            int randIndex = Random.Range(0, usedSongs.Count-1);
            AudioClip pickedSong = usedSongs[randIndex];

            GetComponent<AudioSource>().clip = pickedSong;
            float waitTime = pickedSong.length;
            GetComponent<AudioFade>().startFade(1);
            GetComponent<AudioSource>().Play();
            yield return new WaitForSeconds(waitTime);
            GetComponent<AudioFade>().startFadeOut(1);
            usedSongs.Remove(pickedSong);
            if(usedSongs.Count == 0){
                forceStopped = true;
            }
        }
       
    }
}
