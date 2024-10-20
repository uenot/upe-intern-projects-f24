using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneButton : MonoBehaviour
{
    [SerializeField] int sceneID;
    public void changeScene(){
        GameObject meta = GameObject.FindGameObjectWithTag("Meta");
        if(meta){
            meta.GetComponent<SceneSwitcher>().StartLoadSceneFade(sceneID);
        }
    }
}
