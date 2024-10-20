using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AudioFade : MonoBehaviour
{
    [SerializeField] bool startFadeIn = false;
    [SerializeField] float startFadeDuration = 1;
    [SerializeField] float maximumVolume = 1;
    // Start is called before the first frame update
    void Start()
    {
        if(startFadeIn){
            StartCoroutine(FadeIn(startFadeDuration));
        }
    }

    public void startFade(float duration){
         StartCoroutine(FadeIn(duration));
    }

    public void startFadeOut(float duration){
        StartCoroutine(FadeOut(duration));
    }

    IEnumerator FadeIn(float duration){
        float timePassed = 0;
        while(timePassed < duration){
            GetComponent<AudioSource>().volume = Mathf.Lerp(GetComponent<AudioSource>().volume, maximumVolume, duration * Time.deltaTime);
            timePassed += Time.deltaTime;
            yield return new WaitForFixedUpdate();
        }
    }

    IEnumerator FadeOut(float duration){
        float timePassed = 0;
        while(timePassed < duration){
            GetComponent<AudioSource>().volume = Mathf.Lerp(GetComponent<AudioSource>().volume, 0, duration * Time.deltaTime);
            timePassed += Time.deltaTime;
            yield return new WaitForFixedUpdate();
        }
    }

    
}
