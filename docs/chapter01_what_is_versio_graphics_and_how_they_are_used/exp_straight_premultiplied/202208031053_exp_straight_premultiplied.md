<!--
Title : exp_straight_premultiplied
- Created : 2022-08-03
- Updated :
- Author : James Rivers
- Written against (version):
- Sources : 
- Author Notes :
- Tags : 
-->


# Rendering Graphics - Straight or Pre-multiplied?

In the After Effects world we have the option to render `straight` or `premultiplied.  Never heard of it? Watch this video...

<iframe width="995" height="746" src="https://www.youtube.com/embed/c0kPLEMF4xk" title="Understanding Straight vs. Premultiplied" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Veriso (Phoenix) Does it care? 

Yes, yes, yes ... Versio or rather the graphics component on the server - `Phoenix` definitaly does care about the graphics you send it whether it is `straight` or `pre-multiplied`... If you render in one state and the server is configured in another state - it is going to get weird!

Can set the Versio Server to handle straight or pre-multiplied? Yes. It is not a file by file option it is an overall server setting:
It’s all or nothing for everything played through libav provider.

Set `LibavProviderPreMultiplied` under `HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Inscriber\StreamEffect2` to `0` instead of `1`.

In summary, you need to make the decision in the early stages of your new Versio installation - are we using `straight` or `pre-multiplied`
