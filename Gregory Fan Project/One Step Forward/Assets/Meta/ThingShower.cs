using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ThingShower : MonoBehaviour
{
    // Start is called before the first frame update
    [SerializeField] List<GameObject> things;
    void Start()
    {
        GameObject meta = GameObject.FindGameObjectWithTag("Meta");
        if(meta){
            if(meta.GetComponent<MetaHandler>().dead){
                foreach(GameObject thing in things){
                    thing.SetActive(false);
                }
            }
        }
    }
}
