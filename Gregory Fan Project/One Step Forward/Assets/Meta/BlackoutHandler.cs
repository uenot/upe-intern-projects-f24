using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class BlackoutHandler : MonoBehaviour
{
    public void StartFadeIn(float timeToFade){
        StartCoroutine(fadeIn(timeToFade));
    }

    public void StartFadeOut(float timeToFade){
        StartCoroutine(fadeOut(timeToFade));
    }

    IEnumerator fadeIn(float timeToFade){
        float runningSum = 0;
        while(runningSum < 1){
            runningSum += Time.deltaTime/timeToFade;
            Color newColor = new Color(0, 0, 0, runningSum);
            GetComponent<Image>().color = newColor;
            yield return new WaitForFixedUpdate();
        }
    }

    IEnumerator fadeOut(float timeToFade){
        float runningSum = 0;
        while(runningSum < 1){
            runningSum += Time.deltaTime/timeToFade;
            Color newColor = new Color(0, 0, 0, 1 - runningSum);
            GetComponent<Image>().color = newColor;
            yield return new WaitForFixedUpdate();
        }
    }

}
