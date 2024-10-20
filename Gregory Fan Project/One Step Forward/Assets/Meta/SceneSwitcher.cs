using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneSwitcher : MonoBehaviour
{
    int timeToFade = 2;
    bool alreadyOn = false;
    [SerializeField] GameObject blackOut;

    private void Start() {
        DontDestroyOnLoad(gameObject);
    }

    public void StartLoadSceneFade(int sceneID){
        if(alreadyOn) return;
        alreadyOn = true;
        if(sceneID == -1){
            Application.Quit();
        }
        GameObject[] audioPlayers = GameObject.FindGameObjectsWithTag("AudioPlayer");
        foreach(GameObject audioPlayer in audioPlayers){
            audioPlayer.GetComponent<AudioFade>().startFadeOut(timeToFade);
        }
        StartCoroutine(LoadSceneFade(sceneID));
    }

    IEnumerator LoadSceneFade(int sceneID){
        blackOut.SetActive(true);
        BlackoutHandler blackoutHandler = blackOut.GetComponent<BlackoutHandler>();
        blackoutHandler.StartFadeIn(timeToFade);
        yield return new WaitForSeconds(timeToFade + 0.5f);
        SceneManager.LoadScene(sceneID);
        yield return new WaitForSeconds(0.5f);
        blackoutHandler.StartFadeOut(timeToFade);
         yield return new WaitForSeconds(timeToFade);
        blackOut.SetActive(false);
        alreadyOn = false;
    }

    public void StartCutToBlack(){
        if(alreadyOn) return;
        alreadyOn = true;
          GameObject[] audioPlayers = GameObject.FindGameObjectsWithTag("AudioPlayer");
        foreach(GameObject audioPlayer in audioPlayers){
            audioPlayer.GetComponent<AudioFade>().startFadeOut(0.0001f);
        }
        StartCoroutine(LoadCutBlack());
    }

    IEnumerator LoadCutBlack(){
         blackOut.SetActive(true);
        BlackoutHandler blackoutHandler = blackOut.GetComponent<BlackoutHandler>();
        blackoutHandler.StartFadeIn(0.0001f);

        yield return new WaitForSeconds(timeToFade + 0.5f);
        SceneManager.LoadScene(0);
        yield return new WaitForSeconds(0.5f);
        blackoutHandler.StartFadeOut(0.0001f);
         yield return new WaitForSeconds(0.001f);
        blackOut.SetActive(false);
        alreadyOn = false;
    }
}
