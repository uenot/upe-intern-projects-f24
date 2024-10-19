using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FootSoundHandler : MonoBehaviour
{
    [SerializeField] int materialID = 0;
    [SerializeField] List<AudioClip> concreteBucket;
    [SerializeField] List<AudioClip> dirtBucket;
    [SerializeField] List<AudioClip> grassBucket;
    
    public AudioClip giveAudioClip(){
        if(materialID == 0){
            int randomId = Random.Range(0, concreteBucket.Count);
            return concreteBucket[randomId];
        }
        if(materialID == 1){
            int randomId = Random.Range(0, dirtBucket.Count);
            return dirtBucket[randomId];
        }
        if(materialID == 2){
            int randomId = Random.Range(0, grassBucket.Count);
            return grassBucket[randomId];
        }
        if(materialID == 3){
            GameObject meta = GameObject.FindGameObjectWithTag("Meta");
            if(meta){
                meta.GetComponent<MetaHandler>().dead = true;
                meta.GetComponent<SceneSwitcher>().StartCutToBlack();
            }
        }
        Debug.Log("something is wrong in step audio!");
        return null;
    }


    private void OnTriggerEnter2D(Collider2D other) {
        if(other.tag == "FootChange"){
            materialID = other.gameObject.GetComponent<StepChange>().footChangeID;
        }
    }

    private void OnTriggerExit2D(Collider2D other) {
        if(other.tag == "FootChange"){
            if(other.gameObject.GetComponent<StepChange>().footChangeID == 3){
                materialID = 2;
            }
        }
    }
}
