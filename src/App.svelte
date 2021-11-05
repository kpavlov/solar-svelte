<script lang="js">
    import {onMount} from 'svelte';
    import * as GL from '@sveltejs/gl';

    import {bodies} from "./lib/bodies";
    import {positions} from "./lib/positions";

    console.log(bodies)
    console.log(positions)

    const planets = bodies.slice(1)

    const sun = bodies[0]

    let scale = 100000;
    let planetScale = 100;

    const from_hex = hex => parseInt(hex.slice(1), 16);

    const spaceColor = from_hex('#070211')
    const light = {};
    let camLookAt = 'center';

    onMount(() => {
        let frame;

        const loop = () => {
            frame = requestAnimationFrame(loop);

            light.x = 3 * Math.sin(Date.now() * 0.001);
            light.y = 2.5 + 2 * Math.sin(Date.now() * 0.0004);
            light.z = 3 * Math.cos(Date.now() * 0.002);
        };

        loop();

        return () => cancelAnimationFrame(frame);
    });
</script>

<GL.Scene background={spaceColor}>
    <GL.Target id="center" location={[0, 0, 0]}/>

    <GL.OrbitControls maxPolarAngle={Math.PI/2} let:location>
        <GL.PerspectiveCamera {location} lookAt={camLookAt} near={1} far={10000}/>
    </GL.OrbitControls>

    <GL.AmbientLight intensity={0.5}/>
    <GL.DirectionalLight direction={[-1,-1,-1]} intensity={0.5}/>

    <!-- ecliptic -->
    <!-- <GL.Mesh
             geometry={GL.plane()}
             location={[0,-0.01,0]}
             rotation={[-90,0,0]}
             scale={100000}
             uniforms={{ color: 0xffffff, alpha: 0.01 }}
     />-->

    <!-- Sun -->
    <GL.Group location={[0,0,0]}>
        <GL.Mesh
                geometry={GL.sphere({ turns: 36, bands: 36 })}
                location={[0,0,0]}
                scale={sun.radius/scale}
                uniforms={{ color: from_hex(sun.color), emissive: 0xcccc99 }}
        />
        <GL.PointLight
                location={[0,0,0]}
                color={from_hex(sun.color)}
                intensity={200}
        />
    </GL.Group>

    <!-- spheres -->
    {#each planets as {id, name, color, radius}, i}
        <GL.Target id={id}
                   location={[positions[id].location[0]/scale, positions[id].location[1]/scale, positions[id].location[2]/scale]}/>
        <GL.Mesh
                geometry={GL.sphere({ turns: 36, bands: 36 })}
                location={[positions[id].location[0]/scale, positions[id].location[1]/scale, positions[id].location[2]/scale]}
                scale={radius/scale*planetScale}
                uniforms={{ color: from_hex(color), alpha: 1 }}
                transparent
        />
    {/each}

    <!-- moving light -->
    <GL.Group location={[light.x,light.y,light.z]}>
        <GL.Mesh
                geometry={GL.sphere({ turns: 36, bands: 36 })}
                location={[0,0.2,0]}
                scale={0.1}
                uniforms={{ color: 0xffffff, emissive: 0xcccc99 }}
        />

        <GL.PointLight
                location={[0,0,0]}
                color={0xffffff}
                intensity={0.6}
        />
    </GL.Group>
</GL.Scene>

<div class="controls">

    <label>
        <input type="range" bind:value={scale} min={1000} max={1000000} step={1}> Scene Scale ({scale})
    </label>
    <label>
        <input type="range" bind:value={planetScale} min={1} max={200} step={1}> Planet Zoom ({planetScale})
    </label>

    <label>
        Camera looking at
        <select bind:value={camLookAt}>
            <option value="center">Sun</option>
            {#each planets as {id, name}, i}
                <option value={id}>{name}</option>
            {/each}
        </select>
    </label>
</div>

<style>
    .controls {
        position: absolute;
        bottom: 1em;
        left: 1em;
        background-color: rgba(255, 255, 255, 0.7);
        padding: 1em;
        border-radius: 2px;
    }

    label {
        padding-left: 5em;
    }
</style>